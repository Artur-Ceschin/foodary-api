import { Injectable } from '@kernel/decorators/injectable';
import { env } from './env';

@Injectable()
export class AppConfig {

  readonly auth: AppConfig.Auth;
  readonly database: AppConfig.Database;

  constructor() {

    this.auth = {
      cognito: {
        client: {
          id: env.COGNITO_CLIENT_ID,
          secret: env.COGNITO_CLIENT_SECRET,
        },
      },
    };

    this.database = {
      main: {
        dynamodb: {
          mainTable: env.MAIN_TABLE_NAME,
        },
      },
    };
  }
}

export namespace AppConfig {
  export type Auth = {
    cognito: {
      client: {
        id: string;
        secret: string;
      };
    };
  };
}

export namespace AppConfig {
  export type Database = {
    main: {
      dynamodb: {
        mainTable: string;
      };
    };
  };
}

