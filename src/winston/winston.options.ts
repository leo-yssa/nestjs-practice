import {
  utilities,
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import * as winston from 'winston';

export class WinstonOptions implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions {
    return {
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(process.env.npm_package_version, {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    };
  }
}
