import {GraphNode} from '@/components/graph/GraphNode';
import type {Meta, StoryObj} from '@storybook/react';

export default {
    title: 'Graph/GraphNode',
    component: GraphNode,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof GraphNode>;

type Story = StoryObj<typeof GraphNode>;

export const Primary: Story = {
    args: {
        title: 'Primary Node'
    }
};

export const Secondary: Story = {
    args: {
        title: 'Secondary Node'
    }
};

export const Large: Story = {
    args: {
        title: 'Large Node'
    }
};

export const Small: Story = {
    args: {
        title: 'Small Node'
    }
};

export const Nick: Story = {
    args: {
        title: 'Nick Node'
    }
};
