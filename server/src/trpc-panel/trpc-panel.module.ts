import {TrpcPanelController} from '@/trpc-panel/trpc-panel.controller';
import {Module} from '@nestjs/common';
import {TRPCModule} from 'nestjs-trpc';

@Module({
    imports: [TRPCModule],
    controllers: [TrpcPanelController],
    providers: []
})
export class TrpcPanelModule {}
