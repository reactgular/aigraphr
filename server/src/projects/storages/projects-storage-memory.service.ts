import {
    ProjectsStorage,
    ProjectsStorageResult
} from '@/projects/storages/projects-storage';
import {Logger} from '@nestjs/common';

export class ProjectsStorageMemoryService implements ProjectsStorage {
    private readonly log = new Logger('ProjectsStorageMemoryService');

    public constructor() {
        this.log.warn('Memory storage has some unsupported features');
    }

    public async projectCopy(
        sourceName: string,
        destName: string
    ): Promise<ProjectsStorageResult> {
        return [true];
    }

    public async projectDatabase(name: string): Promise<string> {
        return ':memory:';
    }

    public async projectExists(name: string): Promise<boolean> {
        return true;
    }

    public async projectRemove(name: string): Promise<ProjectsStorageResult> {
        return [true];
    }

    public async projectRename(
        oldName: string,
        newName: string
    ): Promise<ProjectsStorageResult> {
        return [true];
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
