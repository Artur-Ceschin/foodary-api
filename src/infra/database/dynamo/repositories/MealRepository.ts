import { GetCommand, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { Meal } from '@applications/entities/Meal';
import { MealItem } from '../items/MealItem';

@Injectable()
export class MealRepository {
  constructor(private readonly config: AppConfig) {}

  async findById({ mealId, accountId }: MealRepository.FindById): Promise<Meal | null> {

    const command = new GetCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Key: {
        PK: MealItem.getPK({ mealId, accountId }),
        SK: MealItem.getSK({ mealId, accountId }),
      },
    });

    const { Item: mealItem } = await dynamoClient.send(command);

    if(!mealItem) {
      return null;
    }

    return MealItem.toEntity(mealItem as MealItem.ItemType);
  }

  getPutCommandInput(meal: Meal): PutCommandInput {
    const mealItem = MealItem.fromEntity(meal);

    return {
      TableName: this.config.db.dynamodb.mainTable,
      Item: mealItem.toItem(),
    };
  }

  async create(meal: Meal): Promise<void>{
    await dynamoClient.send(new PutCommand(this.getPutCommandInput(meal)));
  }
}

export namespace MealRepository {

  export type FindById = {
    accountId: string
    mealId: string
  }
}
