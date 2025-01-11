import {GrNode} from '@/components/graph/node/GrNode';
import {mockData} from '@/stories/mocks/MockEngine';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

// @see https://storybook-addon-mock.netlify.app/?path=/docs/docs-introduction--docs
export default {
    title: 'Graph/GrNode',
    component: GrNode,
    decorators: [withSuspense()],
    parameters: {
        layout: 'centered',
        mockData: mockData
    },
    tags: ['autodocs'],
    args: {
        id: '1',
        width: 200
    }
} satisfies Meta<typeof GrNode>;

type Story = StoryObj<typeof GrNode>;

export const Normal: Story = {
    args: {}
};

export const Selected: Story = {
    args: {
        selected: true
    }
};

export const Error: Story = {
    args: {
        selected: true,
        error: true
    }
};

export const Active: Story = {
    args: {
        active: true
    }
};

export const NoOutputs: Story = {
    args: {
        address: {
            projectId: 1,
            workspaceId: 1,
            nodeId: 2
        }
    }
};

export const NoInputs: Story = {
    args: {
        address: {
            projectId: 1,
            workspaceId: 1,
            nodeId: 3
        }
    }
};

export const NoParams: Story = {
    args: {
        address: {
            projectId: 1,
            workspaceId: 1,
            nodeId: 4
        }
    }
};

export const TooMany: Story = {
    args: {
        address: {
            projectId: 1,
            workspaceId: 1,
            nodeId: 5
        }
    }
};
