import {ProjectRequest} from '@/projects/gaurds/project.request';
import {ProjectsService} from '@/projects/services/projects.service';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    NotFoundException
} from '@nestjs/common';

function isNumeric(value: string): boolean {
    return !isNaN(parseInt(value, 10));
}

@Injectable()
export class ProjectGuard implements CanActivate {
    private readonly log = new Logger('ProjectGuard');

    public constructor(private readonly projects: ProjectsService) {
        //
    }

    public async canActivate(execContext: ExecutionContext): Promise<boolean> {
        const request = execContext.switchToHttp().getRequest<ProjectRequest>();
        const projectId = request.params.projectId;

        if (projectId && isNumeric(projectId)) {
            request.context = {
                projectId: parseInt(projectId, 10)
            };

            const exists = await this.projects.exists(
                request.context.projectId
            );

            if (!exists) {
                throw new NotFoundException(
                    `Project with ID ${request.context.projectId} does not exist`
                );
            }

            return true;
        }

        this.log.warn('Project ID is not a number');

        return false;
    }
}
