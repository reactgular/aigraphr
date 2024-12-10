import {HASH_NONCE, HashService} from '@/utils/services/hash.service';
import {Module} from '@nestjs/common';
import crypto from 'crypto';

@Module({
    imports: [],
    providers: [
        {
            provide: HASH_NONCE,
            useValue: crypto.randomBytes(16).toString('hex')
        },
        HashService
    ],
    exports: [HashService]
})
export class UtilsModule {
    //
}
