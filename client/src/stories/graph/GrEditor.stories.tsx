import {GrEditor} from '@/components/graph/editor/GrEditor';
import {mockGetNode} from '@/stories/mocks/MockGetNode';
import {mockGetWorkspace} from '@/stories/mocks/MockGetWorkspace';
import {faker} from '@faker-js/faker';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

faker.seed(123);

export default {
    title: 'Graph/GrEditor',
    component: GrEditor,
    decorators: [withSuspense()],
    parameters: {
        layout: 'fullscreen',
        mockData: [
            mockGetNode({projectId: 1, workspaceId: 1, nodeId: 1}, 'core:mock'),
            mockGetWorkspace({projectId: 1, workspaceId: 1})
        ]
    },
    args: {
        address: {
            projectId: 1,
            workspaceId: 1
        }
    }
} satisfies Meta<typeof GrEditor>;

type Story = StoryObj<typeof GrEditor>;

export const Normal: Story = {
    args: {}
};
