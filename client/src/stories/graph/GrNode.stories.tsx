import {GrNode} from '@/components/graph/GrNode';
import type {NodeMockDto} from '@/components/graph/GrNode.types';
import type {Meta, StoryObj} from '@storybook/react';

export default {
    title: 'Graph/GrNode',
    component: GrNode,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        disabled: false,
        dto: {
            id: 1,
            name: 'Example1',
            workspaceId: 1
        } satisfies NodeMockDto,
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
