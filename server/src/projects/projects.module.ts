import {ProjectsFilesController} from '@/projects/controllers/projects-files.controller';
import {ProjectsInstancesController} from '@/projects/controllers/projects-instances.controller';
import {
    PROJECT_EXTENSION,
    PROJECT_STORAGE_NONCE,
    ProjectFilesService
} from '@/projects/services/project-files.service';
import {ProjectInstancesService} from '@/projects/services/project-instances.service';
import {Module} from '@nestjs/common';
import * as crypto from 'crypto';

@Module({
    imports: [],
    controllers: [ProjectsInstancesController, ProjectsFilesController],
    providers: [
        {
            provide: PROJECT_STORAGE_NONCE,
            useValue: crypto.randomBytes(16).toString('hex')
        },
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectInstancesService,
        ProjectFilesService
    ]
})
export class ProjectsModule {}
