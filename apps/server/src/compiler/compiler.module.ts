import {Module} from '@nestjs/common';
import {CompilerService} from './compiler.service';

@Module({
    imports: [],
    controllers: [],
    providers: [CompilerService],
    exports: [CompilerService]
})
export class CompilerModule {}
