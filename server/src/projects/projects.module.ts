import {ProjectEntity} from '@/models/project.entity';
import {
    PROJECT_EXTENSION,
    PROJECT_STORAGE_NONCE
} from '@/projects/_deprecated/project-old-files.service';
import {ProjectsOldController} from '@/projects/_deprecated/projects-old.controller';
import {ProjectsOldService} from '@/projects/_deprecated/projects-old.service';
import {ProjectsHashService} from '@/projects/services/projects-hash.service';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as crypto from 'crypto';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    controllers: [ProjectsOldController],
    providers: [
        {
            provide: PROJECT_STORAGE_NONCE,
            useValue: crypto.randomBytes(16).toString('hex')
        },
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectsOldService,
        ProjectsStorageService,
        ProjectsHashService
    ],
    exports: [ProjectsStorageService]
})
export class ProjectsModule {}
