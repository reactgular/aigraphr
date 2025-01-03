import {
    ProjectsStorage,
    ProjectsStorageResult
} from '@/projects/storages/projects-storage';
import {Logger} from '@nestjs/common';
import {promises as fs} from 'fs';
import path from 'path';

export class ProjectsStorageDiskService implements ProjectsStorage {
    private readonly log = new Logger('ProjectsStorageDiskService');

    public constructor(private readonly storagePath: string) {
        this.log.log(`Using disk storage: ${this.storagePath}`);
    }

    public async projectCopy(
        sourceName: string,
        destName: string
    ): Promise<ProjectsStorageResult> {
        const sourcePath = await this.projectDatabase(sourceName);
        const destPath = await this.projectDatabase(destName);

        try {
            await fs.copyFile(sourcePath, destPath);

            return [true];
        } catch (error) {
            this.log.error(
                `Error while copying project from ${sourcePath} to ${destPath}`,
                error
            );
            return [
                false,
                error instanceof Error ? error : new Error('Unknown error')
            ];
        }
    }

    public async projectDatabase(name: string): Promise<string> {
        return path.resolve(await this.rootFolder(), `${name}.aigraphr`);
    }

    public async projectExists(name: string): Promise<boolean> {
        const path = await this.projectDatabase(name);
        try {
            await fs.access(path);
            return true;
        } catch (error) {
            this.log.warn(`Project path does not exist: ${path}`, error);
            return false;
        }
    }

    public async projectRemove(name: string): Promise<ProjectsStorageResult> {
        const projectPath = await this.projectDatabase(name);

        try {
            await fs.unlink(projectPath);
            return [true];
        } catch (error) {
            this.log.error(
                `Error while removing project ${projectPath}`,
                error
            );
            return [
                false,
                error instanceof Error ? error : new Error('Unknown error')
            ];
        }
    }

    public async projectRename(
        oldName: string,
        newName: string
    ): Promise<ProjectsStorageResult> {
        const oldPath = await this.projectDatabase(oldName);
        const newPath = await this.projectDatabase(newName);

        try {
            await fs.rename(oldPath, newPath);
            return [true];
        } catch (error) {
            this.log.error(
                `Error while renaming project from ${oldPath} to ${newPath}`,
                error
            );
            return [
                false,
                error instanceof Error ? error : new Error('Unknown error')
            ];
        }
    }

    public async rootDatabase(): Promise<string> {
        return path.resolve(await this.rootFolder(), 'aigraphr.sqlite');
    }

    /**
     * @deprecated will become private when we add support for in memory databases.
     */
    public async rootFolder(): Promise<string> {
        try {
            await fs.access(this.storagePath);
        } catch (error) {
            this.log.warn(
                `Storage path does not exist: ${this.storagePath}`,
                error
            );
            try {
                await fs.mkdir(this.storagePath, {recursive: true});
            } catch (error) {
                this.log.error('Error while creating storage path', error);
                throw error;
            }
        }
        return this.storagePath;
    }
}
