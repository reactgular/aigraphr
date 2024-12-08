import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ProjectInstancesService {
    private readonly loaded: Map<string, ProjectInstanceDto> = new Map();

    public create(): string {
        return null;
    }

    public open(projectId: string) {
        return null;
    }

    public close(projectId: string) {
        return null;
    }

    public async projects(): Promise<Array<ProjectInstanceDto>> {
        return [];
    }
}
