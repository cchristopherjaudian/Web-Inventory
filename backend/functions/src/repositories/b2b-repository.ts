import { AccountTypes } from '@prisma/client';
import { TQueryArgs } from '../..';
import { TAccountsListQuery } from '../lib/types/accounts-types';
import ProfileRepository from './profile-repository';

class B2bRepository {
    private _profile = new ProfileRepository();

    public async b2bList(params: TAccountsListQuery) {
        const query = {
            where: {
                account: {
                    accountType: AccountTypes.BUSINESS,
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

export default B2bRepository;
