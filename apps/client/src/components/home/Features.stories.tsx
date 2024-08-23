import {Meta, StoryObj} from '@storybook/react';
import {Features as Component} from './Features';

const meta = {
    title: 'Components/Home/Features',
    component: Component,
    args: {}
} satisfies Meta<typeof Component>;

export default meta;

export const Features = {
    render: (props) => <Component {...props} />
} satisfies StoryObj<typeof meta>;
