import {GrEditor} from '@/components/graph/editor/GrEditor';
import {mockData} from '@/stories/mocks/MockEngine';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

export default {
    title: 'Graph/GrEditor',
    component: GrEditor,
    decorators: [withSuspense()],
    parameters: {
        layout: 'fullscreen',
        mockData
    },
    args: {}
} satisfies Meta<typeof GrEditor>;

type Story = StoryObj<typeof GrEditor>;

export const Empty: Story = {
    args: {
        address: {projectId: 1, workspaceId: 1}
    }
};

export const Example: Story = {
    args: {
        address: {projectId: 1, workspaceId: 2}
    }
};

export const NoInputs: Story = {
    args: {
        address: {projectId: 1, workspaceId: 3}
    }
};

export const NoOutputs: Story = {
    args: {
        address: {projectId: 1, workspaceId: 4}
    }
};

export const NoParams: Story = {
    args: {
        address: {projectId: 1, workspaceId: 5}
    }
};

export const TooMany: Story = {
    args: {
        address: {projectId: 1, workspaceId: 6}
    }
};
