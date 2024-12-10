import {HashService} from '@/utils/services/hash.service';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    providers: [HashService],
    exports: [HashService]
})
export class UtilsModule {
    //
}
