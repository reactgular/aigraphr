import {ProjectEntity} from '@/entities/project.entity';
import {IsKeyOf} from '@/scaffold/decorators/is-keyof.decorator';
import {
    IsSortEnum,
    ScaffoldSort
} from '@/scaffold/decorators/is-sort-enum.decorator';

/**
 * @deprecated to be replaced with scaffolding features.
 */
export class ProjectsIndexDto {
    @IsSortEnum()
    sort: ScaffoldSort = ScaffoldSort.ASC;

    @IsKeyOf<ProjectEntity>(['name'], false)
    sortBy: keyof ProjectEntity = 'name';
}
