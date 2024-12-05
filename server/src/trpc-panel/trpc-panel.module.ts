import {TrpcPanelController} from '@/trpc-panel/trpc-panel.controller';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [TrpcPanelController],
    providers: []
})
export class TrpcPanelModule {}
