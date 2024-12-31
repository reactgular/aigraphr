import {GrNode} from '@/components/graph/GrNode';
import type {Meta, StoryObj} from '@storybook/react';

export default {
    title: 'Graph/GrNode',
    component: GrNode,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        name: 'Example001',
        active: false,
        selected: false,
        disabled: false
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
