import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {ProjectsInstancesListDto} from '@/projects/dtos/projects-instances-list.dto';
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

    /**
     * @deprecated do sort/filter in the controller
     */
    public async list({
        sort,
        filter
    }: ProjectsInstancesListDto): Promise<Array<ProjectInstanceDto>> {
        return [];
    }
}
