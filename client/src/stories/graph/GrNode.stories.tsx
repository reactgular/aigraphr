import type {
    GrNodeDefGetNodeDefGroupsResponses,
    NodesGetResponses
} from '@/api';
import {GrNode} from '@/components/graph/GrNode';
import {mockGrNodeDefDto} from '@/stories/mocks/MockGrNodeDefDto';
import {mockNodeDto} from '@/stories/mocks/MockNodeDto';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

// @see https://storybook-addon-mock.netlify.app/?path=/docs/docs-introduction--docs
export default {
    title: 'Graph/GrNode',
    component: GrNode,
    decorators: [withSuspense()],
    parameters: {
        layout: 'centered',
        mockData: [
            {
                url: 'http://localhost:6006/api/projects/1/workspaces/1/nodes/1',
                method: 'GET',
                status: 200,
                response: mockNodeDto() satisfies NodesGetResponses['200']
            },
            {
                url: 'http://localhost:6006/api/node-def/groups',
                method: 'GET',
                status: 200,
                response:
                    mockGrNodeDefDto() satisfies GrNodeDefGetNodeDefGroupsResponses['200']
            }
        ]
    },
    tags: ['autodocs'],
    args: {
        active: false,
        selected: false,
        error: false,
        address: {
            projectId: 1,
            workspaceId: 1,
            nodeId: 1
        }
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
