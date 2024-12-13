import {EnvConfig} from '@/configs/env.config';
import {ProjectDto} from '@/entities/project.entity';
import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {promises as fs} from 'fs';
import path from 'path';

export const PROJECT_EXTENSION = Symbol();

@Injectable()
export class ProjectsStorageService {
    private readonly log = new Logger('ProjectStorageService');

    public constructor(private config: ConfigService<EnvConfig>) {}

    public async path(): Promise<string> {
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

    public async database(): Promise<string> {
        return path.join(await this.path(), 'aigraphr.sqlite');
    }

    public async project(project: ProjectDto): Promise<string> {
        // TODO: including the ID until I can make name unique
        return path.join(
            await this.path(),
            `${project.name}-${project.id}.sqlite`
        );
    }
}
