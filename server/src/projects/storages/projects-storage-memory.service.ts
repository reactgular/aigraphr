import {EnvConfig} from '@/configs/env.config';
import {
    ProjectsStorage,
    ProjectsStorageResult
} from '@/projects/storages/projects-storage';
import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class ProjectsStorageMemoryService implements ProjectsStorage {
    private readonly inMemory: Record<string, boolean> = {};

    private readonly log = new Logger('ProjectsStorageMemoryService');

    public constructor(private config: ConfigService<EnvConfig>) {}

    public async projectCopy(
        sourceName: string,
        destName: string
    ): Promise<ProjectsStorageResult> {
        return [false, new Error('Not implemented')];
    }

    public async projectDatabase(name: string): Promise<string> {
        return ':memory:';
    }

    public async projectExists(name: string): Promise<boolean> {
        return false;
    }

    public async projectRemove(name: string): Promise<ProjectsStorageResult> {
        return [false, new Error('Not implemented')];
    }

    public async projectRename(
        oldName: string,
        newName: string
    ): Promise<ProjectsStorageResult> {
        return [false, new Error('Not implemented')];
    }

    public async rootDatabase(): Promise<string> {
        return ':memory:';
    }

    /**
     * @deprecated will become private when we add support for in memory databases.
     */
    public async rootFolder(): Promise<string> {
        throw new Error('Not implemented');
    }
}
