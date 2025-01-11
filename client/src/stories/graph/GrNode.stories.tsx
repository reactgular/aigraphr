import {GrNode} from '@/components/graph/node/GrNode';
import {mockGetNode} from '@/stories/mocks/MockGetNode';
import {mockGetNodeDefs} from '@/stories/mocks/MockGetNodeDefs';
import {mockGrNodeDefDto} from '@/stories/mocks/MockGrNodeDefDto';
import {faker} from '@faker-js/faker';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

faker.seed(123);

// @see https://storybook-addon-mock.netlify.app/?path=/docs/docs-introduction--docs
export default {
    title: 'Graph/GrNode',
    component: GrNode,
    decorators: [withSuspense()],
    parameters: {
        layout: 'centered',
        mockData: [
            mockGetNode({projectId: 1, workspaceId: 1, nodeId: 1}, 'core:mock'),
            mockGetNode(
                {projectId: 1, workspaceId: 1, nodeId: 2},
                'core:no-outputs'
            ),
            mockGetNode(
                {projectId: 1, workspaceId: 1, nodeId: 3},
                'core:no-inputs'
            ),
            mockGetNode(
                {projectId: 1, workspaceId: 1, nodeId: 4},
                'core:no-params'
            ),
            mockGetNode(
                {projectId: 1, workspaceId: 1, nodeId: 5},
                'core:too-many'
            ),
            mockGetNodeDefs([
                mockGrNodeDefDto('core:mock'),
                mockGrNodeDefDto('core:no-outputs', 5, 0),
                mockGrNodeDefDto('core:no-inputs', 0, 5),
                mockGrNodeDefDto('core:no-params', 0, 0),
                mockGrNodeDefDto('core:too-many', 12, 12)
            ])
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
        },
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
