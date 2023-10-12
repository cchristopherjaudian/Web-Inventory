import { TPrismaClient } from '../lib/prisma';

class AdminService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async getAdminList() {
        try {
            return this._db.account.findMany({
                where: {
                    OR: [{ accountType: 'SUB_1' }, { accountType: 'SUB_2' }],
                },
            });
        } catch (error) {
            throw error;
        }
    }
}

export default AdminService;
