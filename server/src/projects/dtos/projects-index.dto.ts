import {ProjectEntity} from '@/models/project.entity';
import {IsKeyOf} from '@/scaffold/decorators/is-keyof.decorator';
import {
    IsSortEnum,
    ScaffoldSort
} from '@/scaffold/decorators/is-sort-enum.decorator';

export class ProjectsIndexDto {
    @IsSortEnum()
    sort: ScaffoldSort = ScaffoldSort.ASC;

    @IsKeyOf<ProjectEntity>(['createdAt', 'name'], false)
    sortBy: keyof ProjectEntity = 'createdAt';
}
