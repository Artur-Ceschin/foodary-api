import type awsLambda from 'aws-lambda';
import { BadRequest } from '@application/errors/http/BadRequest';

export function lambdaBodyParser(body: awsLambda.APIGatewayProxyEventV2['body']) {
  try {
    if(!body) {
      return {};
    }

    return  JSON.parse(body ?? '{}');
  } catch {
    throw new BadRequest('Malformated body.');
  }
}
