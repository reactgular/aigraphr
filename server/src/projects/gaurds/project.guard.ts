import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectsService} from '@/projects/services/projects.service';
import {ProjectsStorage} from '@/projects/storages/projects-storage';
import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
    Scope
} from '@nestjs/common';
import {GoneException} from '@nestjs/common/exceptions/gone.exception';
import {Request} from 'express';

function isNumeric(value: string): boolean {
    return !isNaN(parseInt(value, 10));
}

@Injectable({scope: Scope.REQUEST})
export class ProjectGuard implements CanActivate {
    private readonly log = new Logger('ProjectGuard');

    public constructor(
        private readonly projects: ProjectsService,
        @Inject(PROJECTS_STORAGE)
        private readonly projectsStorage: ProjectsStorage
    ) {}

    public async canActivate(execContext: ExecutionContext): Promise<boolean> {
        const request = execContext
            .switchToHttp()
            .getRequest<Request<{projectId?: string}>>();
        const param = request.params.projectId;

        if (param && isNumeric(param)) {
            const projectId = parseInt(param, 10);
            const exists = await this.projects.scaExists(projectId);

            if (!exists) {
                throw new NotFoundException(
                    `Project with ID ${projectId} does not exist`
                );
            }

            const fileExists = await this.projectsStorage.projectExists(
                await this.projects.getName(projectId)
            );

            if (!fileExists) {
                throw new GoneException(
                    `Project with ID ${projectId} has been deleted from the file system`
                );
            }

            // TODO: should we guard against accessing unopened projects?

            return true;
        }

        throw new BadRequestException('Project ID must be a number');
    }
}
