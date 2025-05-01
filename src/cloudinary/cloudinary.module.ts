import { Module, DynamicModule, Provider } from '@nestjs/common';
import { v2 as cloudinary, ConfigOptions as CloudinaryModuleOptions } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { 
  ConfigurableModuleClass, 
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} from './config.module-defenition';

const CLOUDINARY_CONNECTION = 'CLOUDINARY_CONNECTION';

@Module({
  imports: [],
  providers: [
    CloudinaryService,
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule extends ConfigurableModuleClass {
  static forFeature(): DynamicModule {
    return {
      module: CloudinaryModule,
      providers: [
        CloudinaryService,
      ],
      exports: [CloudinaryService],
    }
  }

  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      ...super.forRoot(options),
      providers: [
        ...super.forRoot(options).providers,
        this.createConnectionProvider()
      ],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      ...super.forRootAsync(options),
      providers: [
        ...super.forRootAsync(options).providers,
        this.createConnectionProvider(),
      ],
    };
  }

  private static createConnectionProvider(): Provider {
    return {
      inject: [MODULE_OPTIONS_TOKEN],
      provide: CLOUDINARY_CONNECTION,
      useFactory: (configs: CloudinaryModuleOptions) => {
        return cloudinary.config(configs)
      }
    }
  }
}
