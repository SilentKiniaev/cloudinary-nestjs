import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { 
  v2 as cloudinary, 
  UploadApiResponse, 
  UploadApiErrorResponse, 
  VideoFormat, 
  ImageFormat, 
  UploadApiOptions 
} from 'cloudinary';

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
    private readonly cloudinary = cloudinary;

    constructor() {}

    public async uploadFiles(
      files: Express.Multer.File[], 
      options?: UploadApiOptions | UploadApiOptions[]
    ): Promise<CloudinaryResponse[]> {
      const promises = files.map((file, fileIndex) => {
        const uploadOptions = options instanceof Array ? options[fileIndex] : options;
        return this.uploadFile(file, uploadOptions);
      });
      const result = await Promise.all(promises);
      return result;
    }

    public async uploadFile(
      file: Express.Multer.File, 
      options?: UploadApiOptions
    ): Promise<CloudinaryResponse> {
      try {
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);

        const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
          const writableStream = cloudinary.uploader.upload_stream(
            options ?? {},
            (error, result) => {
              if (error)
                return reject(error);
              resolve(result);
            }
          )/*.end(file.buffer)*/;
          readableStream.pipe(writableStream);
        });
        return result;
      } catch (error) {
        throw error;
      }
    }

    public getCloudinaryInstance() {
      return this.cloudinary;
    }
}
