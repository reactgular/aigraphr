import {Module} from '@nestjs/common';
import {TRPCModule} from 'nestjs-trpc';
import {AppController} from './app.controller';
import {AppRouter} from './app.router';
import {AppService} from './app.service';
import {TrpcPanelController} from './trpc-panel.controller';

@Module({
    imports: [
        TRPCModule.forRoot({
            autoSchemaFile: '../shared/src/trpc'
        })
    ],
    controllers: [AppController, TrpcPanelController],
    providers: [AppService, AppRouter]
})
export class AppModule {}
