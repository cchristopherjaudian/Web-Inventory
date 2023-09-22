import { PrismaClient } from '@prisma/client';

class AdminService {
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
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
