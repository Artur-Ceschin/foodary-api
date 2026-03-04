import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { BadRequest } from 'src/applications/errors/http/BadRequest';

export function lambdaBodyParser(body: APIGatewayProxyEventV2['body']) {
  try {
    if(!body) {
      return {};
    }

    return JSON.parse(body);
  } catch {
    throw new BadRequest('Malformed body');
  }
}

