import {TrpcUiController} from '@/trpc/trpc-ui.controller';
import {TrpcRouter} from '@/trpc/trpc.router';
import {TrpcService} from '@/trpc/trpc.service';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [TrpcUiController],
    providers: [TrpcService, TrpcRouter],
    exports: [TrpcService, TrpcRouter]
})
export class TrpcModule {}
