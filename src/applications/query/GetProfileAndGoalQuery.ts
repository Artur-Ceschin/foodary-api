import { Profile } from '@applications/entities/Profile';
import { ResourceNotFound } from '@applications/errors/application/ResourceNotFound';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { AccountItem } from '@infra/database/dynamo/items/AccountItem';
import { GoalItem } from '@infra/database/dynamo/items/GoalItem';
import { ProfileItem } from '@infra/database/dynamo/items/ProfileItem';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';

@Injectable()
export class GetProfileAndGoalQuery {

  constructor(private readonly config: AppConfig) {}

  async execute({ accountId }:
    GetProfileAndGoalQuery.Input): Promise<GetProfileAndGoalQuery.Output> {

    const command = new QueryCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Limit: 2,
      ProjectionExpression: '#PK, #SK, #name, #birthDate, #gender, #height, #weight, #calories, #fats, #proteins, #carbohydrates, #type',
      KeyConditionExpression: '#PK = :PK AND begins_with(#SK, :SK)',
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#SK': 'SK',
        '#name': 'name',
        '#birthDate': 'birthDate',
        '#gender': 'gender',
        '#height': 'height',
        '#weight': 'weight',
        '#calories': 'calories',
        '#fats': 'fats',
        '#proteins': 'proteins',
        '#carbohydrates': 'carbohydrates',
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':PK': AccountItem.getPK(accountId),
        ':SK': `${AccountItem.getPK(accountId)}#`,
      },
    });

    const { Items = [] } = await dynamoClient.send(command);

    const profile = Items.find((item):item is GetProfileAndGoalQuery.ProfileItemType =>
      item.type === ProfileItem.type,
    );

    const goal = Items.find((item): item is GetProfileAndGoalQuery.GoalItemType =>
      item.type === GoalItem.type,
    );

    if(!profile || !goal) {
      throw new ResourceNotFound('Account not found');
    }

    return {
      profile: {
        birthDate: profile.birthDate,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        name: profile.name,
      },
      goal: {
        fats: goal.fats,
        calories: goal.calories,
        proteins: goal.proteins,
        carbohydrates: goal.carbohydrates,
      },
    };
  }
}

export namespace GetProfileAndGoalQuery {
  export type Input = {
    accountId: string
  }

  export type ProfileItemType = {
    name: string;
    birthDate: string;
    gender: Profile.Gender;
    height: number;
    weight: number;
  }

  export type GoalItemType = {
    calories: number;
    proteins: number;
    carbohydrates: number
    fats: number;
  }

  export type Output = {
    profile: ProfileItemType,
    goal: GoalItemType
  }
}
