import { AccountTypes } from '@prisma/client';
import { TQueryArgs } from '../..';
import { TAccountsListQuery } from '../lib/types/accounts-types';
import ProfileRepository from './profile-repository';

class B2cRepository {
    private _profile = new ProfileRepository();

    public async b2cList(params: TAccountsListQuery) {
        const query = {
            where: {
                account: {
                    accountType: AccountTypes.CUSTOMER,
                },
            },
        } as TQueryArgs;

        if (params?.search) {
            query.where!.account.email = {
                contains: params.search,
            };
        }

        if (params?.status) {
            query.where!.account.status = params.status;
        }

        return await this._profile.list({
            where: {
                ...query.where,
            },
            include: {
                account: true,
            },
        });
    }
}

export default B2cRepository;
