import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status: number;
        let message: string | object;
        let details: string | object;
        let errorResponse: any = {};

        // Phân loại ngoại lệ
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = exceptionResponse instanceof Object ? (exceptionResponse as any).message : exceptionResponse;
            details = exceptionResponse instanceof Object ? (exceptionResponse as any).details || exception.message : exception.message;
        } else if (exception instanceof Error) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'An unexpected error occurred';
            details = exception.message;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Unknown error';
            details = 'No additional details available';
        }

        // Ghi log
        this.logger.error(`Exception: ${exception instanceof Error ? exception.stack : String(exception)}`);

        // Tạo phản hồi
        response.status(status).json({
            statusCode: status,
            message: errorResponse.message || message,
            error: errorResponse.error || 'Internal Server Error',
            errors: errorResponse.errors || null, // Trả về lỗi chi tiết của class-validator
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        });
    }
}
