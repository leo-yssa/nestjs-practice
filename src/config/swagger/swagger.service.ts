import { Injectable, type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
@Injectable()
export class SwaggerService {
  constructor() {}
  setupSwagger(prefix: string, app: INestApplication): void {
    const documentBuilder = new DocumentBuilder()
      .addServer(`http://localhost:${process.env.SERVER_PORT}`)
      .setTitle(`${process.env.npm_package_name} API docs`)
      .setDescription(`Provide a list of APIs and specs for ${process.env.npm_package_name}.`)
      .setVersion(process.env.npm_package_version)
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      })
      .build();

    SwaggerModule.setup(
      `${process.env.npm_package_name}/${prefix}/docs`,
      app,
      SwaggerModule.createDocument(app, documentBuilder),
    );
  }
}
