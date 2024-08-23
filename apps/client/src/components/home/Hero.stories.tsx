import {Meta, StoryObj} from '@storybook/react';
import {Hero as Component} from './Hero';

const meta = {
    title: 'Components/Home/Hero',
    component: Component,
    args: {}
} satisfies Meta<typeof Component>;

export default meta;

export const Hero = {
    render: (props) => <Component {...props} />
} satisfies StoryObj<typeof meta>;
