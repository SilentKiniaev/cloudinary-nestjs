import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { ConfigOptions as CloudinaryModuleOptions } from 'cloudinary';

export interface CloudinaryModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    useFactory?: (...args: any[]) => Promise<CloudinaryModuleOptions> | CloudinaryModuleOptions;
    inject?: any[];
    extraProviders?: Provider[];
}