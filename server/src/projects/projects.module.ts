import {ProjectEntity} from '@/entities/project.entity';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {
    PROJECT_EXTENSION,
    ProjectsStorageService
} from '@/projects/services/projects-storage.service';
import {ProjectsService} from '@/projects/services/projects.service';
import {HASH_NONCE} from '@/utils/services/hash.service';
import {UtilsModule} from '@/utils/utils.module';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as crypto from 'crypto';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity]), UtilsModule],
    controllers: [ProjectsController],
    providers: [
        {
            provide: HASH_NONCE,
            useValue: crypto.randomBytes(16).toString('hex')
        },
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectsService,
        ProjectsStorageService,
        ProjectDatabasesService
    ],
    exports: [ProjectsStorageService]
})
export class ProjectsModule {}
