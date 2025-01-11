import type {WorkspaceDto} from '@/api';
import {faker} from '@faker-js/faker';

export const mockWorkspaceDto = ({
    workspaceId
}: {
    workspaceId: number;
}): WorkspaceDto => {
    return {
        id: workspaceId,
        description: faker.lorem.sentence(),
        engine: 'javascript',
        name: faker.lorem.words(1)
    };
};
