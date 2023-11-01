import jwt from 'jsonwebtoken';
import { auth } from 'firebase-admin';

type TVerifiedToken = {
    id: string;
};

class TokenService {
    private _tokenSecret;
    constructor() {
        this._tokenSecret = String(process.env.TOKEN_SECRET);
    }

    public async verifyGoogleToken(token: string) {
        const authenticated = await auth().verifyIdToken(token);
        return authenticated;
    }

    public sign(payload: Record<string, any>) {
        return new Promise((resolve, reject) => {
            return jwt.sign(
                {
                    ...payload,
                },
                this._tokenSecret,
                {
                    expiresIn: '1d',
                },
                function (err, token) {
                    return err ? reject(err) : resolve(token as string);
                }
            );
        });
    }

    public verify(token: string): Promise<TVerifiedToken> {
        return new Promise((resolve, reject) => {
            return jwt.verify(token, this._tokenSecret, (err, decoded) => {
                return err ? reject(err) : resolve(decoded as TVerifiedToken);
            });
        });
    }
}

export default TokenService;
