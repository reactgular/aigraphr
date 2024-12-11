import {ScaffoldSort} from '@/scaffold/decorators/is-sort-enum.decorator';
import * as R from 'remeda';

/**
 * @deprecated replacing with TypeORM sorting.
 */
export function scaffoldSort<TType>(
    items: TType[],
    prop: keyof TType,
    sort: ScaffoldSort
): TType[] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const ordered = R.pipe(items, R.sortBy(R.prop(prop)));
    if (sort === ScaffoldSort.DESC) {
        return ordered.reverse();
    }
    return ordered;
}
