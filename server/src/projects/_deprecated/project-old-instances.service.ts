import {ProjectFileDto} from '@/projects/_deprecated/dtos/project-file.dto';
import {
    ProjectInstanceDto,
    ProjectInstanceWithFileDto
} from '@/projects/_deprecated/dtos/project-instance.dto';
import {ProjectOldService} from '@/projects/_deprecated/project-old.service';
import {Injectable} from '@nestjs/common';
import {ContextId, ContextIdFactory, ModuleRef} from '@nestjs/core';

interface ProjectRef {
    contextId: ContextId;
    project: ProjectOldService;
    instance: ProjectInstanceDto;
}

/**
 * @deprecated
 */
@Injectable()
export class ProjectOldInstancesService {
    private readonly loaded: Map<string, ProjectRef> = new Map();

    public constructor(private readonly moduleRef: ModuleRef) {}

    public async open(
        storage: ProjectFileDto
    ): Promise<ProjectInstanceWithFileDto> {
        const contextId = ContextIdFactory.create();
        const project = await this.moduleRef.create(
            ProjectOldService,
            contextId
        );
        return null;
    }

    public async close(projectId: string) {
        return null;
    }

    public async projects(): Promise<Array<ProjectInstanceWithFileDto>> {
        return [];
    }
}
