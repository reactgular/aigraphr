import {ProjectDto} from '@/projects/_deprecated/dtos/project.dto';
import {PickType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger/dist/type-helpers/partial-type.helper';

/**
 * @deprecated
 */
export class ProjectPatchDto extends PartialType(
    PickType(ProjectDto, ['name', 'open'] as const)
) {}
