import {assertObjects} from './assert-objects';

export function assertEntities<
    TBody extends {
        id: number;
    },
    TPromise
>(promise: TPromise) {
    const asserts = assertObjects<TBody, TPromise>(promise);
    const isId = (value: number) => {
        return {...promise, ...asserts, isId, isEntity, isWithoutId};
    };
    const isEntity = (value: TBody) => {
        return {...promise, ...asserts, isId, isEntity, isWithoutId};
    };
    const isWithoutId = (value: Omit<TBody, 'id'>) => {
        return {...promise, ...asserts, isId, isEntity, isWithoutId};
    };
    return {...promise, ...asserts, isId, isEntity, isWithoutId};
}
