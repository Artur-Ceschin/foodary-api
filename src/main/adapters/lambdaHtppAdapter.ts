import { ZodError } from 'zod';
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Controller } from '@application/contracts/Controller';
import { ErrorCode } from '@application/errors/ErrorCode';
import { HttpError } from '@application/errors/http/HttpError';
import { lambdaBodyParser } from '@main/utils/lambdaBodyParse';
import { lambdaErrorResponse } from '@main/utils/lambdaErrorResponse';
import { ApplicationError } from '@application/errors/application/ApplicationError';

export function lambdaHttpAdapter(controller: Controller<unknown>) {
  return async(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
   try {
      const params = event.pathParameters ?? {};
      const queryParams = event.queryStringParameters ?? {};
      const body = lambdaBodyParser(event.body);

      const response = await controller.execute({
        body,
        params,
        queryParams,
      });

      return {
        statusCode: response.statusCode,
        body: response.body ? JSON.stringify(response.body) : undefined,
      };
   } catch (error) {
     if (error instanceof ZodError) {
       return lambdaErrorResponse({
         statusCode: 400,
         code: ErrorCode.VALIDATION,
         message: error.issues.map(issue => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
       });
     }

     if(error instanceof HttpError) {
       return lambdaErrorResponse(error);
     }

     if(error instanceof ApplicationError) {
       return lambdaErrorResponse({
         statusCode: error.statusCode || 400,
         code: error.code,
         message: error.message,
       });
     }

     console.log('Error=>', error);

     return lambdaErrorResponse({
      statusCode: 500,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
     });
   }
  };
}
