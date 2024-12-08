import {AppModule} from '@/app/app.module';
import {VALIDATE_ENV_CONFIG} from '@/configs/env.config';
import {ProjectsModule} from '@/projects/projects.module';
import {WorkspacesModule} from '@/workspaces/workspaces.module';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            validationSchema: VALIDATE_ENV_CONFIG,
            validationOptions: {
                abortEarly: true
            }
        }),
        AppModule,
        ProjectsModule,
        WorkspacesModule
    ],
    controllers: [],
    providers: []
})
export class MainModule {}
