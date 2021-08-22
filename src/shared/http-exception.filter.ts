import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // console.log('exception', exception);

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.path,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message || null
          : HttpStatus.INTERNAL_SERVER_ERROR,
      validationErrors:
        status === HttpStatus.BAD_REQUEST
          ? exception.getResponse()['message']
          : undefined,
    };
    return response.status(status).json(errorResponse);
  }
}
