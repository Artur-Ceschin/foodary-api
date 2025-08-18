export interface IController<TBody = undefined> {

  handle(params: IController.Request<TBody>): Promise<IController.Response<TBody>>
}

export namespace IController {
  export type Request<
  TBody = Record<string, unknown>,
  TParams = Record<string, unknown>,
  TQueryParams = Record<string, unknown>,
  > = {
    body: TBody;
    params: TParams;
    queryParams: TQueryParams;
  }

  export type Response<TBody = unknown> = {
    statusCode: number;
    body?: TBody;
  }
}
