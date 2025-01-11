import {GrEditor} from '@/components/graph/editor/GrEditor';
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
        mockData: []
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
