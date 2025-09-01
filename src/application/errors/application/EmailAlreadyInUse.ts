import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class EmailAlreadyInUse extends ApplicationError {
  public override statusCode = 409;

  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.name = 'EmailAlreadyInUse';
    this.code = code ?? ErrorCode.EMAIL_ALREADY_IN_USE;
    this.message = message ?? 'This email is already in use';
  }
}
