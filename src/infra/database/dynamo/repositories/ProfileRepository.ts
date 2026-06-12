import { GetCommand, PutCommand, PutCommandInput, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { Profile } from 'src/applications/entities/Profile';
import { ProfileItem } from '../items/ProfileItem';

@Injectable()
export class ProfileRepository {
  constructor(private readonly config: AppConfig) {}

  async findByEmailId(accountId: string) {
    const command = new GetCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Key: {
        PK: ProfileItem.getPK(accountId),
        SK: ProfileItem.getSK(accountId),
      },
    });

    const { Item: profileItem } = await dynamoClient.send(command);

    if(!profileItem) {
      return null;
    }

    return ProfileItem.toEntity(profileItem as ProfileItem.ItemType);
  }

  async save(profile: Profile) {

    const profileItem = ProfileItem.fromEntity(profile).toItem();

    const updateExpression = Object.entries(profileItem).filter(([key]) => !['PK', 'SK', 'type'].includes(key)).reduce((acc, [key, value] ) => {
      return {
        expressionNames: { ...acc.expressionNames, [`#${key}`]: key },
        expressionValues: { ...acc.expressionValues, [`:${key}`]: value },
        updateExpression: [
          ...acc.updateExpression,
          `#${key} = :${key}`,
        ],
      };
    },  { expressionNames: {}, expressionValues: {}, updateExpression: [] as string[] });

    const command = new UpdateCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Key: {
        PK: profileItem.PK,
        SK: profileItem.SK,
      },
      UpdateExpression: `SET ${updateExpression.updateExpression}`,
      ExpressionAttributeNames: updateExpression.expressionNames,
      ExpressionAttributeValues: updateExpression.expressionValues,
      ReturnValues: 'NONE',
    });

    await dynamoClient.send(command);
  }

  getPutCommandInput(profile: Profile): PutCommandInput {

    const profileItem = ProfileItem.fromEntity(profile);

    return {
      TableName: this.config.db.dynamodb.mainTable,
      Item: profileItem.toItem(),
    };
  }

  async create(profile: Profile): Promise<void>{
    await dynamoClient.send(new PutCommand(this.getPutCommandInput(profile)));
  }
}
