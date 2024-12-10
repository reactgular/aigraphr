import {EnvConfig} from '@/configs/env.config';
import {ProjectFileDto} from '@/projects/_deprecated/dtos/project-file.dto';
import {Person} from '@/projects/_deprecated/models/person.model';
import {Injectable, Logger, Scope} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as path from 'path';
import {Sequelize} from 'sequelize-typescript';

/**
 * @deprecated
 */
@Injectable({
    scope: Scope.REQUEST
})
export class ProjectOldService {
    private sequelize?: Sequelize;

    private storage?: ProjectFileDto;

    public constructor(private config: ConfigService<EnvConfig>) {
        console.log('ProjectService created');
    }

    public static connect(storage: string): Sequelize {
        log.log(`Connecting to ${storage}`);
        return new Sequelize({
            dialect: 'sqlite',
            storage,
            models: [Person]
        });
    }

    public async open(storage: ProjectFileDto) {
        await this.close();

        const storagePath = this.config.get('PROJECTS_FOLDER');

        this.storage = storage;
        this.sequelize = ProjectOldService.connect(
            path.join(storagePath, storage.name)
        );
    }

    public async close() {
        if (this.sequelize) {
            await this.sequelize.close();
        }
    }
}

const log = new Logger(ProjectOldService.name);
