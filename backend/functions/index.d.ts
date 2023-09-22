import { Request } from 'express';
import { TAccounts } from './src/lib/types/accounts-types';
import { TProfile } from './src/lib/types/profile-types';

type TResponseError = {
    statusCode?: string;
    status?: number;
    message?: string;
    stack?: string;
};

export interface IAuthRequest extends Request {
    profile: TProfile;
    account: TAccounts;
}

export interface TQueryArgs {
    select?: AccountSelect<ExtArgs> | null;
    include?: AccountInclude<ExtArgs> | null;
    where?: AccountWhereInput;
    orderBy?:
        | AccountOrderByWithRelationInput
        | AccountOrderByWithRelationInput[];
    cursor?: AccountWhereUniqueInput;

    take?: number;

    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
}

export type TNormalizedError = Error & TResponseError;

export interface IHttpOptions {
    omit?: boolean | Expression<boolean>;

    region?:
        | SupportedRegion
        | string
        | Array<SupportedRegion | string>
        | Expression<string>
        | ResetValue;

    cors?: string | boolean | RegExp | Array<string | RegExp>;

    memory?: options.MemoryOption | Expression<number> | ResetValue;

    timeoutSeconds?: number | Expression<number> | ResetValue;

    minInstances?: number | Expression<number> | ResetValue;

    maxInstances?: number | Expression<number> | ResetValue;

    concurrency?: number | Expression<number> | ResetValue;

    cpu?: number | 'gcf_gen1';
}
