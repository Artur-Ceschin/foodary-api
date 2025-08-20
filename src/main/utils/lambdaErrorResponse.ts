import { ErrorCode } from '../../application/errors/ErrorCode';

interface ILambdaErrorResposeParams {
  statusCode: number;
  code: ErrorCode;
  message: any;
}

export function lambdaErrorResponse({
  statusCode,
  code,
  message,
}: ILambdaErrorResposeParams) {
  return {
    statusCode,
    body: JSON.stringify({
      error: {
        code,
        message,
      },
    }),
  };
}
