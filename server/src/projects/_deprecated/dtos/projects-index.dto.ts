import {ProjectFileDto} from '@/projects/_deprecated/dtos/project-file.dto';
import {IsKeyOf} from '@/scaffold/decorators/is-keyof.decorator';
import {
    IsSortEnum,
    ScaffoldSort
} from '@/scaffold/decorators/is-sort-enum.decorator';

/**
 * @deprecated
 */
export class ProjectsIndexDto {
    @IsSortEnum()
    sort: ScaffoldSort = ScaffoldSort.ASC;

    @IsKeyOf<ProjectFileDto>(['createdAt', 'name'], false)
    sortBy: keyof ProjectFileDto = 'createdAt';
}