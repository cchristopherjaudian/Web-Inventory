import AccountRepository from './account-repository';

class AdminRepository {
  private _repo = new AccountRepository();

  public async adminList() {
    return await this._repo.list({
      where: {
        OR: [{ accountType: 'SUB_1' }, { accountType: 'SUB_2' }],
      },
    });
  }
}

export default AdminRepository;
