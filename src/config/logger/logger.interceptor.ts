import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const correlationId = uuidV4();

    if (context.getType() === 'http') {
      return this.handleHttpRequest(context, next, correlationId);
    }
    /* 요청 방식에 따른 logger 처리 방식 추가
    e.g. [graphql]
     if ((context.getType() as string) === 'graphql') {
       return this.handleGraphQLRequest(context, next, correlationId);
     }*/
    return next.handle();
  }

  private handleHttpRequest(context: ExecutionContext, next: CallHandler<any>, correlationId: string): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { ip, method, url, body } = req;
    req.correlationId = correlationId;
    this.logger.log(`Incoming HTTP request: [${method}] ${url} ${correlationId}`, context.getClass().name, {
      request: {
        ip,
        body,
      },
    });

    const now = Date.now();
    return next.handle().pipe(
      tap((resBody) => {
        const duration = Date.now() - now;
        this.logger.log(
          `Outgoing HTTP response: [${method}] ${url} ${correlationId} ${res.statusCode} ${duration}ms`,
          context.getClass().name,
          {
            response: {
              body: resBody,
              statusCode: res.statusCode,
              duration,
            },
          },
        );
      }),
      catchError((err) => {
        this.logger.error(
          `Error occurred in HTTP request: [${method}] ${url} ${correlationId}`,
          err.stack,
          err.context,
        );
        return throwError(() => err);
      }),
    );
  }
}
