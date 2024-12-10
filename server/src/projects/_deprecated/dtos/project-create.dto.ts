import {ProjectDto} from '@/projects/_deprecated/dtos/project.dto';
import {PickType} from '@nestjs/swagger';

/**
 * @deprecated
 */
export class ProjectCreateDto extends PickType(ProjectDto, ['name'] as const) {}
