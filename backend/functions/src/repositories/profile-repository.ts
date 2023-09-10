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
}

export default ProfileRepository;
