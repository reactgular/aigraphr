import {ProjectsInstancesController} from '@/projects/controllers/projects-instances.controller';
import {ProjectsStoragesController} from '@/projects/controllers/projects-storages.controller';
import {ProjectInstancesService} from '@/projects/services/project-instances.service';
import {
    PROJECT_STORAGE_NONCE,
    ProjectStoragesService
} from '@/projects/services/project-storages.service';
import {Module} from '@nestjs/common';
import * as crypto from 'crypto';

@Module({
    imports: [],
    controllers: [ProjectsInstancesController, ProjectsStoragesController],
    providers: [
        {
            provide: PROJECT_STORAGE_NONCE,
            useValue: crypto.randomBytes(16).toString('hex')
        },
        ProjectInstancesService,
        ProjectStoragesService
    ]
})
export class ProjectsModule {}
