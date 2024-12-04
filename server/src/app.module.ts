import {Module} from '@nestjs/common';
import {TRPCModule} from 'nestjs-trpc';
import {AppController} from './app.controller';
import {AppRouter} from './app.router';
import {AppService} from './app.service';

@Module({
    imports: [
        TRPCModule.forRoot({
            autoSchemaFile: './src/@generated'
        })
    ],
    controllers: [AppController],
    providers: [AppService, AppRouter]
})
export class AppModule {}
