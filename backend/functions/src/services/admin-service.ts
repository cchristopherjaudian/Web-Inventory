import AdminRepository from '../repositories/admin-repository';

class AdminService {
  private _repo = new AdminRepository();

  public async getAdminList() {
    return this._repo.adminList();
  }
}

export default AdminService;
