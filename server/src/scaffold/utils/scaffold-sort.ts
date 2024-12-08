import {ScaffoldSort} from '@/scaffold/decorators/is-sort-enum.decorator';
import * as R from 'remeda';

export function scaffoldSort<TType>(
    items: TType[],
    prop: keyof TType,
    sort: ScaffoldSort
): TType[] {
    const ordered = R.pipe(items, R.sortBy(R.prop(prop)));
    if (sort === ScaffoldSort.DESC) {
        return ordered.reverse();
    }
    return ordered;
}
