import {Editor} from '@/components/editor/Editor';
import {faker} from '@faker-js/faker';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

faker.seed(123);

// @see https://storybook-addon-mock.netlify.app/?path=/docs/docs-introduction--docs
export default {
    title: 'Editor/Editor',
    component: Editor,
    decorators: [withSuspense()],
    parameters: {
        layout: 'centered',
        mockData: []
    },
    tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof Editor>;

type Story = StoryObj<typeof Editor>;

export const Normal: Story = {
    args: {}
};
