import {DynamicModule, Module} from '@nestjs/common';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import * as process from 'node:process';
import {WorkspacesService} from './workspaces.service';
import {AIGRAPHR_FOLDER, AIGRAPHR_WORKSPACE} from './workspaces.tokens';

const getAiGraphrFolder = async (folder: string): Promise<string> => {
    const aiGraphrFolder = path.resolve(process.cwd(), folder);

    try {
        await fs.access(aiGraphrFolder);
    } catch (error) {
        // If the directory does not exist, create it
        if (error.code === 'ENOENT') {
            await fs.mkdir(aiGraphrFolder, {recursive: true});
        } else {
            throw error; // Re-throw any other errors
        }
    }

    return aiGraphrFolder;
};

@Module({})
export class WorkspacesModule {
    public static async forRoot(): Promise<DynamicModule> {
        return {
            module: WorkspacesModule,
            providers: [
                {
                    provide: AIGRAPHR_FOLDER,
                    useFactory: async () => getAiGraphrFolder('.aigraphr')
                },
                {provide: AIGRAPHR_WORKSPACE, useValue: 'workspace.json'},
                WorkspacesService
            ],
            exports: [WorkspacesService]
        };
    }
}
