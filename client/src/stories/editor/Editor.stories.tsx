import {Editor} from '@/components/editor/Editor';
import {faker} from '@faker-js/faker';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

faker.seed(123);

export default {
    title: 'Editor/Editor',
    component: Editor,
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
} satisfies Meta<typeof Editor>;

type Story = StoryObj<typeof Editor>;

export const Normal: Story = {
    args: {}
};
