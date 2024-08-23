import {Meta, StoryObj} from '@storybook/react';
import {Footer as Component} from './Footer';

const meta = {
    title: 'Components/Home/Footer',
    component: Component,
    args: {}
} satisfies Meta<typeof Component>;

export default meta;

export const Footer = {
    render: (props) => <Component {...props} />
} satisfies StoryObj<typeof meta>;
