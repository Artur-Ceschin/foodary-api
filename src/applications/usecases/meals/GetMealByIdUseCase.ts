import { Meal } from '@applications/entities/Meal';
import { ResourceNotFound } from '@applications/errors/application/ResourceNotFound';
import { MealRepository } from '@infra/database/dynamo/repositories/MealRepository';
import { MealsFilesStorageGateway } from '@infra/gateways/MealsFilesStorageGateway';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class GetMealByIdUseCase {

  constructor(
    private readonly mealRepository: MealRepository,
    private readonly mealsFileStorageGateway: MealsFilesStorageGateway,
  ){}

  async execute({
    mealId,
    accountId,
  }: GetMealByIdUseCase.Input): Promise<GetMealByIdUseCase.OutPut> {

    const meal = await this.mealRepository.findById({ accountId, mealId });

    if(!meal) {
      throw new ResourceNotFound('Meal not found.');
    }

    const inputFileURL = this.mealsFileStorageGateway.getFileURL(meal.inputFileKey);

    return {
      meal: {
        accountId: meal.accountId,
        status: meal.status,
        id: meal.id,
        inputType: meal.inputType,
        inputFileURL: inputFileURL,
        name: meal.name,
        icon: meal.icon,
        foods: meal.foods,
        createdAt: meal.createdAt,
      },
    };
  }

}

export namespace GetMealByIdUseCase {

  export type Input = {
    mealId: string;
    accountId:string
  }

  export type OutPut = {
    meal: {
      id: string
      accountId: string
      status: Meal.Status;
      inputType: Meal.InputType;
      inputFileURL: string;
      name: string;
      icon: string;
      foods: Meal.Food[];
      createdAt: Date
    }
  }
}
