import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '@shared/dto/error-response.dto';

export const ApiErrorResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: '잘못된 요청',
      type: ErrorResponseDto,
      schema: {
        example: {
          statusCode: 400,
          message: '잘못된 요청입니다.',
          error: 'BadRequestException',
          timestamp: '2024-03-14T12:00:00Z',
          path: '/api/v1/users',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '인증되지 않은 요청',
      type: ErrorResponseDto,
      schema: {
        example: {
          statusCode: 401,
          message: '인증되지 않은 요청입니다.',
          error: 'UnauthorizedException',
          timestamp: '2024-03-14T12:00:00Z',
          path: '/api/v1/users',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: '접근 권한 없음',
      type: ErrorResponseDto,
      schema: {
        example: {
          statusCode: 403,
          message: '접근 권한이 없습니다.',
          error: 'ForbiddenException',
          timestamp: '2024-03-14T12:00:00Z',
          path: '/api/v1/users',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '리소스를 찾을 수 없음',
      type: ErrorResponseDto,
      schema: {
        example: {
          statusCode: 404,
          message: '리소스를 찾을 수 없습니다.',
          error: 'NotFoundException',
          timestamp: '2024-03-14T12:00:00Z',
          path: '/api/v1/users',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '서버 내부 오류',
      type: ErrorResponseDto,
      schema: {
        example: {
          statusCode: 500,
          message: '서버 내부 오류가 발생했습니다.',
          error: 'InternalServerErrorException',
          timestamp: '2024-03-14T12:00:00Z',
          path: '/api/v1/users',
        },
      },
    }),
  );
};
