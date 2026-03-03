import z from 'zod';
import { Controller } from '../contracts/Controller';

const schema = z.object({
  account: z.object({
    name: z.string('Invalid name').min(1, 'Name is required'),
  }),
  email: z.email('Invalid email'),
});

export class HelloController extends Controller<unknown> {
  protected override schema = schema;

  protected async handle(request: Controller.Request): Promise<Controller.Response<unknown>> {
    return {
      statusCode: 200,
      body: {
        parsedBody: request.body,
      },
    };
  }
}
