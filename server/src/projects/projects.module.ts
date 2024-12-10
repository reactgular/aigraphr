import {ProjectEntity} from '@/entities/project.entity';
import {
    PROJECT_EXTENSION,
    PROJECT_STORAGE_NONCE
} from '@/projects/_deprecated/project-old-files.service';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import {ProjectsHashService} from '@/projects/services/projects-hash.service';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {ProjectsService} from '@/projects/services/projects.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as crypto from 'crypto';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    controllers: [ProjectsController],
    providers: [
        {
            provide: PROJECT_STORAGE_NONCE,
            useValue: crypto.randomBytes(16).toString('hex')
        },
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectsService,
        ProjectsStorageService,
        ProjectsHashService
    ],
    exports: [ProjectsStorageService]
})
export class ProjectsModule {}
