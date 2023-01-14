import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      this.logger.error(exception);
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    const stack = exception.stack;

    const log = {
      url: req.url,
      response,
      stack,
    };

    this.logger.error(log);

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
