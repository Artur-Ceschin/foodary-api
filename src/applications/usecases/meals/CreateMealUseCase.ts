import { Meal } from '@applications/entities/Meal';
import { MealRepository } from '@infra/database/dynamo/repositories/MealRepository';
import { MealsFilesStorageGateway } from '@infra/gateways/MealsFilesStorageGateway';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class CreateMealUseCase {

  constructor(
    private readonly mealRepositor: MealRepository,
    private readonly mealFileStorageGateway: MealsFilesStorageGateway,
  ) {}

  async execute({ accountId, file }: CreateMealUseCase.Input):
    Promise<CreateMealUseCase.Output> {

    const inputFileKey = MealsFilesStorageGateway.generateInputFileKey({
      accountId,
      inputType: file.inputType,
    });

    const meal = new Meal({
      accountId,
      inputTye: file.inputType,
      status: Meal.Status.UPLOADING,
      inputFileKey,
    });

    const [, { uploadSignature }] = await Promise.all([
      this.mealRepositor.create(meal),
      this.mealFileStorageGateway.createPOST({
        fileKey: inputFileKey,
        fileSize: file.size,
        inputType: file.inputType,
      }),
    ]);

    return {
      mealId: meal.id,
      uploadSignature,
    };
  }
}

export namespace CreateMealUseCase {

  export type Input = {
    accountId: string
    file: {
      inputType: Meal.InputType
      size: number
    }
  }

  export type Output = {
    mealId: string
    uploadSignature: string
  }
}
