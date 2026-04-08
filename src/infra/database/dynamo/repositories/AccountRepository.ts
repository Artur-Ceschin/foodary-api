import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { Account } from 'src/applications/entities/Account';
import { AccountItem } from '../items/AccountItem';
import { QueryCommand } from '@aws-sdk/client-dynamodb';

@Injectable()
export class AccountRepository {
  constructor(private readonly config: AppConfig) {}

  async findEmail(email: string): Promise<Account | null> {

    const command = new QueryCommand({
      IndexName: 'GSI1',
      TableName: this.config.db.dynamodb.mainTable,
      Limit: 1,
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: {
        '#GSI1PK': 'GSI1PK',
        '#GSI1SK': 'GSI1SK',
      },
      ExpressionAttributeValues: {
        ':GSI1PK': { S: AccountItem.getGSI1PK(email) },
        ':GSI1SK': { S: AccountItem.getGSI1SK(email) },
      },
    });

    const { Items = [] } = await dynamoClient.send(command);

    const account = Items[0] as AccountItem.ItemType | undefined;

    if(!account) {
      return null;
    }

    return AccountItem.toEntity(account);

  }

  async create(account: Account): Promise<void>{

    const accountItem = AccountItem.fromEntity(account);

    const command = new PutCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Item: accountItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
