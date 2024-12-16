import {EnvConfig} from '@/configs/env.config';
import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {promises as fs} from 'fs';
import path from 'path';

export const PROJECT_EXTENSION = Symbol();

@Injectable()
export class ProjectsStorageService {
    private readonly log = new Logger('ProjectStorageService');

    public constructor(private config: ConfigService<EnvConfig>) {}

    public async projectCopy(
        sourceName: string,
        destName: string
    ): Promise<[true] | [false, Error]> {
        const sourcePath = await this.projectPath(sourceName);
        const destPath = await this.projectPath(destName);

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

    public async projectExists(name: string): Promise<boolean> {
        const path = await this.projectPath(name);
        try {
            await fs.access(path);
            return true;
        } catch (error) {
            this.log.warn(`Project path does not exist: ${path}`, error);
            return false;
        }
    }

    public async projectPath(name: string): Promise<string> {
        return path.join(await this.rootFolder(), `${name}.aigraphr`);
    }

    public async projectRemove(name: string): Promise<[true] | [false, Error]> {
        const projectPath = await this.projectPath(name);

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
    ): Promise<[true] | [false, Error]> {
        const oldPath = await this.projectPath(oldName);
        const newPath = await this.projectPath(newName);

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
        return path.join(await this.rootFolder(), 'aigraphr.sqlite');
    }

    public async rootFolder(): Promise<string> {
        const storagePath = path.resolve(this.config.get('PROJECTS_FOLDER')!);
        try {
            await fs.access(storagePath);
        } catch (error) {
            this.log.warn(`Storage path does not exist: ${storagePath}`, error);
            try {
                await fs.mkdir(storagePath, {recursive: true});
            } catch (error) {
                this.log.error('Error while creating storage path', error);
                throw error;
            }
        }
        return storagePath;
    }
}
