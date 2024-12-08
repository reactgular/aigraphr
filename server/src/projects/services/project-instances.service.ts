import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {Injectable, Scope} from '@nestjs/common';

@Injectable({
    scope: Scope.DEFAULT
})
export class ProjectInstancesService {
    private readonly loaded: Map<string, ProjectInstanceDto> = new Map();

    public async open(storage: ProjectStorageDto): Promise<ProjectInstanceDto> {
        return null;
    }

    public async close(projectId: string) {
        return null;
    }

    public async projects(): Promise<Array<ProjectInstanceDto>> {
        return [];
    }
}
