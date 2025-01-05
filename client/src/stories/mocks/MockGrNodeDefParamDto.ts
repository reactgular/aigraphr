import type {GrNodeDefParamDto} from '@/api';
import {faker} from '@faker-js/faker';

const types = [
    'userType',
    'string',
    'number',
    'boolean',
    'object'
] satisfies Array<GrNodeDefParamDto['type']>;

export const mockGrNodeDefParamDto = (): GrNodeDefParamDto => {
    return {
        description: faker.lorem.sentence(5),
        isArray: faker.datatype.boolean(),
        name: faker.lorem.word(),
        type: faker.helpers.arrayElement(types)
    };
};
