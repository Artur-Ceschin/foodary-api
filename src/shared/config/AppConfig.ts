import { Injectable } from "@kernel/decorators/Injectable";
import { envSchema } from "./envSchema";
import { ZodError } from 'zod'


@Injectable()
export class AppConfig {
  readonly auth: AppConfig.Auth

  private getAndValidateEnv() {
    try {
      return envSchema.parse(process.env)

    } catch (error) {
      if(error instanceof ZodError) {
        throw new Error(JSON.stringify(error))
      }
      throw error
    }
  }

  constructor() {

    const env = this.getAndValidateEnv()

    this.auth = {
      cognito: {
        clientId: env.COGNITO_CLIENT_ID
      }
    }
  }
}


export namespace AppConfig {
  export type Auth = {
    cognito: {
      clientId:  string
    }
  }
}
