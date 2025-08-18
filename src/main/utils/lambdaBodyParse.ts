import type awsLambda from 'aws-lambda';

export function lambdaBodyParser(body: awsLambda.APIGatewayProxyEventV2['body']) {
  try {
    if(!body) {
      return {};
    }

    return  JSON.parse(body ?? '{}');
  } catch {
    throw new Error('Malformated body.');
  }
}
