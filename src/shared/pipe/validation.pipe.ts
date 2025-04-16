import { ValidationPipe } from '@nestjs/common';

export const validationPipe = (): ValidationPipe => {
  return new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    disableErrorMessages: false,
  });
};
