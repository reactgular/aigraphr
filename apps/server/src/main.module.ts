import {Module, OnModuleInit} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ModuleRef} from '@nestjs/core';
import {AppController} from './app/app.controller';
import {AppService} from './app/app.service';
import {CompilerModule} from './compiler/compiler.module';
import {PluginsModule} from './plugins/plugins.module';
import {WorkspacesModule} from './workspaces/workspaces.module';
import {WorkspacesService} from './workspaces/workspaces.service';

export interface MainModuleOptions {
    pluginsPath?: string;
}

@Module({})
export class MainModule implements OnModuleInit {
    public constructor(private readonly moduleRef: ModuleRef) {
        //
    }

    public static forBootstrap({pluginsPath}: MainModuleOptions) {
        return {
            module: MainModule,
            imports: [
                ConfigModule.forRoot({
                    load: [WorkspacesService.load]
                }),
                PluginsModule.forRoot({pluginsPath}),
                WorkspacesModule.forRoot(),
                CompilerModule
            ],
            controllers: [AppController],
            providers: [AppService]
        };
    }

    public async onModuleInit() {
        // throw new Error('Method not implemented.');
        //
        // const loader = this.moduleRef.get(PluginLoaderService);
    }
}
