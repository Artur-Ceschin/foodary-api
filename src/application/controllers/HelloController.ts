import { Controller } from '../contracts/Controller';
import { z } from 'zod';

const schema = z.object({
  account: z.object({
    name: z.string().min(1, 'Name is required'),
  }),
  email: z.email('Invalid email').min(1, 'Email is required'),
});

export class HelloController extends Controller<unknown> {
  protected override async handle(request: Controller.Request): Promise<Controller.Response<unknown>> {
    const parsedBody = schema.parse(request.body);

    return {
      statusCode: 200,
      body: {
        parsedBody,
      },
    };
  }
}
