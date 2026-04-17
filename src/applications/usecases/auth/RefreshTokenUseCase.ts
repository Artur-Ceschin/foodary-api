import { Injectable } from '@kernel/decorators/Injectable';
import { InvalidRefreshToken } from 'src/applications/errors/application/InvalidRefreshToken';
import { AuthGateway } from 'src/infra/gateways/AuthGateway';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
  ){}

  async execute({ refreshToken }: RefreshTokenUseCase.Input): Promise<RefreshTokenUseCase.Output> {
    try {
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      } = await this.authGateway.refreshToken({ refreshToken });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new InvalidRefreshToken();
    }
  }
}

export namespace RefreshTokenUseCase {
  export type Input = {
    refreshToken: string
  }

  export type Output = {
    accessToken: string
    refreshToken: string
  }
}
