import {GraphNode} from '@/components/graph/GraphNode';
import type {Meta, StoryObj} from '@storybook/react';

export default {
    title: 'Graph/GraphNode',
    component: GraphNode,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        name: 'Example001'
    }
} satisfies Meta<typeof GraphNode>;

type Story = StoryObj<typeof GraphNode>;

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
