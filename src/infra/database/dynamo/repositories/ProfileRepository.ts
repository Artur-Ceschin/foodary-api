import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { Profile } from 'src/applications/entities/Profile';
import { ProfileItem } from '../items/ProfileItem';

@Injectable()
export class ProfileRepository {
  constructor(private readonly config: AppConfig) {}

  getPutCommandInput(profile: Profile): PutCommandInput {

    const profileItem = ProfileItem.fromEntity(profile);

    return {
      TableName: this.config.db.dynamodb.mainTable,
      Item: profileItem.toItem(),
    };
  }

  async create(profile: Profile): Promise<void>{
    await dynamoClient.send(new PutCommand(this.getPutCommand(profile)));
  }
}
