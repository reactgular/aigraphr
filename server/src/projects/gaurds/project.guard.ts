import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger
} from '@nestjs/common';
import {Request} from 'express';

type ProjectId = {projectId: string};

function isNumeric(value: string): boolean {
    return !isNaN(parseInt(value, 10));
}

export class ProjectContextDo {
    public projectId: number;
}

export interface ProjectRequest extends Request<ProjectId> {
    context: ProjectContextDo;
}

@Injectable()
export class ProjectGuard implements CanActivate {
    private readonly log = new Logger('ProjectGuard');

    public async canActivate(execContext: ExecutionContext): Promise<boolean> {
        const request = execContext.switchToHttp().getRequest<ProjectRequest>();

        const projectId = request.params.projectId;
        if (projectId && isNumeric(projectId)) {
            request.context = {
                projectId: parseInt(projectId, 10)
            };

            // @todo need to validate project ID and open the database connection

            return true;
        }

        this.log.warn('Project ID is not a number');

        return false;
    }
}
