import { initializeApp } from 'firebase-admin/app';
import * as cf from 'firebase-functions/v2/https';
import { IHttpOptions } from '../..';

export type THttpsFunction = cf.HttpsFunction;

initializeApp();

class CloudFunctions {
    private _cf = cf;
    private _options = { region: 'asia-east1' } as IHttpOptions;

    public withRuntime(options?: IHttpOptions): this {
        this._options = options ?? { region: 'asia-east1' };
        return this;
    }

    public handlerV2(func: cf.HttpsFunction) {
        return this._cf.onRequest(this._options, func);
    }
}

export default CloudFunctions;
