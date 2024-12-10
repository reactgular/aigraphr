import {ProjectsController} from '@/projects/controllers/projects.controller';
import {
    PROJECT_EXTENSION,
    PROJECT_STORAGE_NONCE
} from '@/projects/services/project-files.service';
import {ProjectsHashService} from '@/projects/services/projects-hash.service';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {ProjectsService} from '@/projects/services/projects.service';
import {Module} from '@nestjs/common';
import * as crypto from 'crypto';

@Module({
    imports: [],
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
