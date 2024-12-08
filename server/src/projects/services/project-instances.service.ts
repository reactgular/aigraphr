import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {ProjectService} from '@/projects/services/project.service';
import {Injectable, Scope} from '@nestjs/common';
import {ContextId, ContextIdFactory, ModuleRef} from '@nestjs/core';

interface ProjectRef {
    contextId: ContextId;
    project: ProjectService;
    instance: ProjectInstanceDto;
}

@Injectable({
    scope: Scope.DEFAULT
})
export class ProjectInstancesService {
    private readonly loaded: Map<string, ProjectRef> = new Map();

    public constructor(private readonly moduleRef: ModuleRef) {}

    public async open(storage: ProjectStorageDto): Promise<ProjectInstanceDto> {
        const contextId = ContextIdFactory.create();
        const project = await this.moduleRef.create(ProjectService, contextId);
        return null;
    }

    public async close(projectId: string) {
        return null;
    }

    public async projects(): Promise<Array<ProjectInstanceDto>> {
        return [];
    }
}
