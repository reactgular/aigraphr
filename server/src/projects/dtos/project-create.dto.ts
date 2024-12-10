import {ProjectDto} from '@/projects/dtos/project.dto';
import {PickType} from '@nestjs/swagger';

export class ProjectCreateDto extends PickType(ProjectDto, ['name'] as const) {}
