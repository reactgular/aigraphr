import {Inject, Injectable} from '@nestjs/common';
import crypto from 'crypto';

export const HASH_NONCE = Symbol();

@Injectable()
export class HashService {
    public constructor(@Inject(HASH_NONCE) private readonly nonce: string) {}

    public hash(str: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(this.nonce + str, 'utf8');
        return hash.digest('hex');
    }
}
