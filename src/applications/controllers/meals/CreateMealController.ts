
import { CreateMealUseCase } from '@applications/usecases/meals/CreateMealUseCase';
import { Injectable } from '@kernel/decorators/Injectable';
import { Controller } from 'src/applications/contracts/Controller';
import { CreateMealBody, createMealSchema } from './schemas/createMealSchema';
import { Meal } from '@applications/entities/Meal';
import { Schema } from '@kernel/decorators/Schema';

@Injectable()
@Schema(createMealSchema)
export class CreateMealController extends Controller<'private', CreateMealController.Response> {

  constructor(private readonly createMealUseCase: CreateMealUseCase) {
    super();
  }

  protected override async handle({
    accountId,
    body,
  }: Controller.Request<'private', CreateMealBody>): Promise<Controller.Response<CreateMealController.Response>> {
    const { file } = body;

    const inputType = (
      file.type === 'audio/m4a'
        ? Meal.InputType.AUDIO
        : Meal.InputType.PICTURE
    );

    const { mealId, uploadSignature } = await this.createMealUseCase.execute({
      accountId,
      file: {
        size: file.size,
        inputType,
      },
    });

    return {
      statusCode: 201,
      body: {
        mealId,
        uploadSignature,
      },
    };
  }
}

export namespace CreateMealController {
  export type Response = {
    mealId: string
    uploadSignature: string
  }
}
