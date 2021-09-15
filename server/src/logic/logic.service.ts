import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from "crypto";

@Injectable()
export class LogicService {

    public async ComparePassword(password: string, hash: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const check = await bcrypt.compare(password, hash);
            if (check) resolve(check);
            else reject(new UnauthorizedException("Wrong password."));
        });
    }

    public async Encrypt(password: string): Promise<string> {
        return new Promise(async (resolve) => {
            const salt = await bcrypt.genSalt();
            resolve(await bcrypt.hash(password, salt));
        });
    }

    public CheckEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const check = email.includes('@');
            if (check) resolve(true);
            else reject(new UnauthorizedException("Wrong email format."));
        });
    }

    public GenerateRandomBytes(length: number){
        return crypto.randomBytes(length).toString('hex');
    }
}