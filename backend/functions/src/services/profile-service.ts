import { TProfile } from '../lib/types/profile-types';
import ProfileRepository from '../repositories/profile-repository';

class ProfileService {
  private _repo = new ProfileRepository();

  public async createProfile(payload: TProfile) {
    const profile = await this._repo.create(payload);
    return profile;
  }

  public async getProfile(payload: Partial<TProfile>) {
    const profile = await this._repo.findOne(payload);
    return profile;
  }

  public async updateProfile(payload: Partial<TProfile>) {
    const updateProfile = await this._repo.update(payload);
    return updateProfile;
  }
}

export default ProfileService;
