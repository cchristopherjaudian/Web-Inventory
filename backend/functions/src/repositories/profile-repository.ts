import { NotFoundError } from '../lib/custom-errors/class-errors';
import Prisma from '../lib/prisma';
import { TProfile } from '../lib/types/profile-types';

class ProfileRepository {
  private _db = Prisma.Instance.db;

  public async create(payload: TProfile) {
    try {
      const profile = await this._db.profile.create({
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          middlename: payload.middlename,
          address: payload.address,
          account: {
            connect: {
              id: payload.account.id,
            },
          },
        },
      });
      return profile;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }

  public async findOne(payload: Record<string, any>) {
    try {
      const account = await this._db.profile.findFirst({
        where: payload,
        include: {
          account: true,
        },
      });
      return account;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }

  public async update(payload: Partial<TProfile>) {
    try {
      const hasProfile = await this.findOne({ accountId: payload.account?.id });
      if (!hasProfile) throw new NotFoundError('Profile does not exists.');

      const profile = await this._db.profile.update({
        where: { id: hasProfile?.id },
        data: {
          ...payload,
          account: {
            update: {
              data: {
                ...payload.account,
              },
            },
          } as any,
        },
      });
      return profile;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }
}

export default ProfileRepository;
