import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/exceptions.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Loại bỏ các thuộc tính không có trong DTO
    forbidNonWhitelisted: true, // Báo lỗi nếu có thuộc tính không xác định
    transform: true, // Tự động chuyển đổi kiểu dữ liệu
    disableErrorMessages: false, // Hiển thị thông báo lỗi chi tiết
    transformOptions: {
      enableImplicitConversion: true, // Cho phép chuyển đổi kiểu ngầm định
    },
    // Trong exceptionFactory của ValidationPipe
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const errors = validationErrors.map(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          property: error.property,
          messages: constraints,
          value: error.value
        };
      });

      return new BadRequestException(errors);
    }
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
