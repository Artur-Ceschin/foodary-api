export abstract class Controller<TBody = undefined> {
  protected abstract handle(request: Controller.Request<TBody>): Promise<Controller.Response<TBody>>

  public execute(request: Controller.Request<TBody>): Promise<Controller.Response<TBody>> {
    console.log('Excecute controller ran');
    return this.handle(request);
  }
}

export namespace Controller {
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
