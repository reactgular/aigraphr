import type {GrNodeDefDto} from '@/api';
import {mockGrNodeDefParamDto} from '@/stories/mocks/MockGrNodeDefParamDto';
import {faker} from '@faker-js/faker';

export const mockGrNodeDefDto = (
    type: string,
    inputs: number = 3,
    outputs = 1
): GrNodeDefDto => {
    return {
        description: faker.lorem.sentence(8),
        icon: 'Bot',
        group: 'core',
        inputs: Array.from({length: inputs}, () => mockGrNodeDefParamDto()),
        outputs: Array.from({length: outputs}, () => mockGrNodeDefParamDto()),
        type,
        version: 1
    };
};
