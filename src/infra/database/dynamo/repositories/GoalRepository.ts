import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { Goal } from 'src/applications/entities/Goal';
import { GoalItem } from '../items/GoalITem';

@Injectable()
export class GoalRepository {
  constructor(private readonly config: AppConfig) {}
  async create(goal: Goal): Promise<void>{

    const goalItem = GoalItem.fromEntity(goal);

    const command = new PutCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Item: goalItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
