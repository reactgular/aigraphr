import {EnvConfig} from '@/configs/env.config';
import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {Person} from '@/projects/models/person.model';
import {Injectable, Logger, Scope} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as path from 'path';
import {Sequelize} from 'sequelize-typescript';

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectService {
    private sequelize?: Sequelize;

    private storage?: ProjectStorageDto;

    public constructor(private config: ConfigService<EnvConfig>) {
        console.log('ProjectService created');
    }

    public static connect(storage: string): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage,
            models: [Person]
        });
    }

    public async open(storage: ProjectStorageDto) {
        await this.close();

        const storagePath = this.config.get('PROJECTS_FOLDER');

        this.storage = storage;
        this.sequelize = ProjectService.connect(
            path.join(storagePath, storage.fileName)
        );
    }

    public async close() {
        if (this.sequelize) {
            await this.sequelize.close();
        }
    }
}

const log = new Logger(ProjectService.name);
