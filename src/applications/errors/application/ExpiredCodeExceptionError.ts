import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class ExpiredCodeExceptionError extends ApplicationError {

  public override code: ErrorCode;
  public override statusCode = 400;

  constructor() {
    super();

    this.name = 'ExpiredCodeException';
    this.message = 'This code was already used';
    this.code = ErrorCode.EXPIRED_CODE_EXCEPTION_ERROR;
  }
}
