import { TProfile } from '../lib/types/profile-types';
import ProfileRepository from '../repositories/profile-repository';

class ProfileService {
  private _repo = new ProfileRepository();

  public async createProfile(payload: TProfile) {
    const profile = await this._repo.create(payload);
    return profile;
  }

  public async getProfile(payload: Partial<TProfile>) {
    console.log('payload', payload);
    const profile = await this._repo.findOne(payload);
    return profile;
  }
}

export default ProfileService;
