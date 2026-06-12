
import { Injectable } from '@kernel/decorators/Injectable';
import { Controller } from 'src/applications/contracts/Controller';
import { Schema } from '@kernel/decorators/Schema';
import { UpdateGoalBody, updateGoalSchema } from './schemas/updateGoalSchema';
import { UpdateGoalUseCase } from '@applications/usecases/goals/UpdateGoalUseCase';

@Injectable()
@Schema(updateGoalSchema)
export class UpdateGoalController extends Controller<'private', UpdateGoalController.Response> {
  constructor(private readonly updateGoalUseCase: UpdateGoalUseCase) {
    super();
  }

  protected override async handle({
    accountId,
    body,
  }: Controller.Request<'private', UpdateGoalBody>):
    Promise<Controller.Response<UpdateGoalController.Response>> {

    const {
      calories,
      carbohydrates,
      fats,
      proteins,
    } = body;

    await this.updateGoalUseCase.execute({
      accountId,
      calories,
      carbohydrates,
      fats,
      proteins,
    });

    return {
      statusCode: 204,
    };
  }
}

export namespace UpdateGoalController {
  export type Response = null
}
