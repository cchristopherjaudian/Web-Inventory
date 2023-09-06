import * as cf from 'firebase-functions';

interface ICloudFunctions {
  withRuntime: (options?: cf.RuntimeOptions) => ICloudFunctions;
  handlerV1: (func: cf.HttpsFunction, region?: string) => cf.HttpsFunction;
}

export type THttpsFunction = cf.HttpsFunction;

class CloudFunctions implements ICloudFunctions {
  private _defaultRegion = 'asia-east1';
  private _cf = cf;

  public withRuntime(options?: cf.RuntimeOptions): ICloudFunctions {
    this._cf.runWith(options || {});
    return this;
  }

  public handlerV1(func: cf.HttpsFunction, region?: string) {
    return this._cf.region(region || this._defaultRegion).https.onRequest(func);
  }
}

export default CloudFunctions;
