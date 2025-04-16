import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { validationPipe } from '@shared/pipe/validation.pipe';
import { SwaggerProvider } from '@shared/swagger/swagger.provider';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({
    credentials: true,
    origin: true,
  });
  const prefix = process.env.SERVER_PREFIX || 'api';
  app.setGlobalPrefix(prefix);
  const port = process.env.SERVER_PORT || 5001;
  app.useGlobalPipes(validationPipe());

  const swaggerService = app.get(SwaggerProvider);
  swaggerService.setupSwagger(prefix, app);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
