import type {ProjectDto} from '@/api';
import {faker} from '@faker-js/faker';

export const mockProjectDto = ({
    projectId
}: {
    projectId: number;
}): ProjectDto => {
    return {
        id: projectId,
        encrypted: false,
        fileName: faker.system.fileName(),
        name: faker.lorem.words(1),
        open: true
    };
};
