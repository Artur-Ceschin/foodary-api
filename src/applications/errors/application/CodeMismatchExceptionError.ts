import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class CodeMismatchExceptionError extends ApplicationError {

  public override code: ErrorCode;
  public override statusCode = 400;

  constructor() {
    super();

    this.name = 'CodeMismatchExceptionError';
    this.message = 'The code provided is wrong';
    this.code = ErrorCode.CODE_MISMATCH_EXCEPTION_ERROR;
  }
}
