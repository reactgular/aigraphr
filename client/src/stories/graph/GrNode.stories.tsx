import type {NodesGetResponses} from '@/api';
import {GrNode} from '@/components/graph/GrNode';
import type {Meta, StoryObj} from '@storybook/react';

// @see https://storybook-addon-mock.netlify.app/?path=/docs/docs-introduction--docs
export default {
    title: 'Graph/GrNode',
    component: GrNode,
    parameters: {
        layout: 'centered',
        mockData: [
            {
                url: 'http://localhost:6006/api/projects/1/workspaces/1/nodes/1',
                method: 'GET',
                status: 200,
                response: {
                    id: 1,
                    workspaceId: 1
                } satisfies NodesGetResponses['200']
            }
        ]
    },
    tags: ['autodocs'],
    args: {
        disabled: false,
        projectId: 1,
        workspaceId: 1,
        nodeId: 1,
        readonly: false
    }
} satisfies Meta<typeof GrNode>;

type Story = StoryObj<typeof GrNode>;

export const Disabled: Story = {
    args: {}
};

export const Secondary: Story = {
    args: {}
};

export const Large: Story = {
    args: {}
};

export const Small: Story = {
    args: {}
};
