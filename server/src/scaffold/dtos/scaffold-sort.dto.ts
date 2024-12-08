import {
    IsScaffoldSort,
    ScaffoldSort
} from '@/scaffold/decorators/scaffold-sort.decorator';

export class ScaffoldSortDto {
    @IsScaffoldSort()
    sort: ScaffoldSort = ScaffoldSort.ASC;
}
