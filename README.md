# Foobar

Nest.js module based on [cloudinary](https://www.npmjs.com/package/cloudinary) library.

## Installation

Use the package manager npm to install module.

```bash
npm install @wrongnestjs/cloudinary
```

## Usage

At first connect async cloudinary module in the root app.module.ts.

```javascript
import { CloudinaryModule } from '@wrongnestjs/cloudinary';

@Module({
  imports: [
    CloudinaryModule.forRootAsync({  
      useFactory: (configService: ConfigService) => ({
        cloud_name: configService.get<string>('cloud_name'),
        api_key: configService.get<string>('api_key'),
        api_secret: configService.get<string>('api_secret'),
      }),
      inject: [ConfigService],
      import: [ConfigModule],
    }),
  ],
})
```

Or connect sync module version in app.module.ts.

```javascript
import { CloudinaryModule } from '@wrongnestjs/cloudinary';

@Module({
  imports: [
    CloudinaryModule.forRoot({  
      cloud_name: 'cloud_name',
      api_key: 'api_key',
      api_secret: 'api_secret',
    }),
  ],
})
```

To use cloudinary module in other project's modules after connection in the root module.

```javascript
@Module({
  imports: [
    CloudinaryModule,
  ],
})
export class MyModule {}
```

Cloudinary service features usage example.

```javascript
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { CloudinaryService } from '@wrongnestjs/cloudinary';

@Controller()
export class MyController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file, { folder: 'my-folder' })
  }
}
```