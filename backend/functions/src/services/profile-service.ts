import {
  NotFoundError,
  ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import { TProfile } from '../lib/types/profile-types';
import ProfileRepository from '../repositories/profile-repository';
import AccountService from './account-service';

class ProfileService {
  private _repo = new ProfileRepository();
  private _acc = new AccountService();

  public async createProfile(payload: TProfile) {
    const profile = await this._repo.create(payload);
    return profile;
  }

  public async getProfile(payload: Partial<TProfile>) {
    const profile = await this._repo.findOne(payload);
    return profile;
  }

  public async updateProfile(payload: Partial<TProfile>) {
    let hasEmail;
    if (payload.account?.email) {
      hasEmail = await this._acc.findAccount({ email: payload.account.email });
    }
    if (hasEmail) throw new ResourceConflictError('Email already exists.');

    const hasProfile = await this.getProfile({
      accountId: payload.account?.id,
    });
    if (!hasProfile) throw new NotFoundError('Profile does not exists.');

    payload.id = hasProfile.id;
    const updateProfile = await this._repo.update(payload);
    return updateProfile;
  }
}

export default ProfileService;
