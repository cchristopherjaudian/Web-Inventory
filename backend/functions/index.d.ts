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
