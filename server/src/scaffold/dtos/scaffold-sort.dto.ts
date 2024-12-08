import {
    IsSortEnum,
    ScaffoldSort
} from '@/scaffold/decorators/is-sort-enum.decorator';

export class ScaffoldSortDto {
    @IsSortEnum()
    sort: ScaffoldSort = ScaffoldSort.ASC;
}
