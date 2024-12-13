import {ProjectsService} from '@/projects/services/projects.service';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    Scope
} from '@nestjs/common';
import {Request} from 'express';

function isNumeric(value: string): boolean {
    return !isNaN(parseInt(value, 10));
}

/**
 * @todo we could use the ProjectEntityService to check if the project exists
 */
@Injectable({scope: Scope.REQUEST})
export class ProjectGuard implements CanActivate {
    private readonly log = new Logger('ProjectGuard');

    public constructor(private readonly projects: ProjectsService) {}

    public async canActivate(execContext: ExecutionContext): Promise<boolean> {
        const request = execContext
            .switchToHttp()
            .getRequest<Request<{projectId?: string}>>();
        const param = request.params.projectId;

        if (param && isNumeric(param)) {
            const projectId = parseInt(param, 10);
            return await this.projects.exists(projectId);
        }

        this.log.warn('Project ID is not a number');

        return false;
    }
}
