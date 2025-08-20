import { Schema } from '@kernel/decorators/schema';
import { Controller } from '@application/contracts/Controller';
import { helloSchema, HelloSchema } from './schemas/helloSchema';

@Schema(helloSchema)
export class HelloController extends Controller<unknown> {
  protected override async handle(
    request: Controller.Request<HelloSchema>):
    Promise<Controller.Response<unknown>>
  {
    return {
      statusCode: 200,
      body: {
        parsedBody: request.body,
      },
    };
  }
}
