
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/Schema';
import { Controller } from 'src/applications/contracts/Controller';
import { RefreshTokenUseCase } from 'src/applications/usecases/auth/RefreshTokenUseCase';
import { RefreshTokenBody, refreshTokenSchema } from './schemas/refreshTokenSchema';

@Injectable()
@Schema(refreshTokenSchema)
export class RefreshTokenController extends Controller<'public', RefreshTokenController.Response> {

  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {
    super();
  }

  protected async handle(
    { body }: Controller.Request<'public', RefreshTokenBody>):
    Promise<Controller.Response<RefreshTokenController.Response>> {

    const { refreshToken } = body;

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } = await this.refreshTokenUseCase.execute({
      refreshToken,
    });

    return {
      statusCode: 200,
      body: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }
}

export namespace RefreshTokenController {
  export type Response = {
    accessToken: string
    refreshToken: string
  }
}
