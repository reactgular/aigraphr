import {Meta, StoryObj} from '@storybook/react';
import {Header as Component} from './Header';

const meta = {
    title: 'Components/Home/Header',
    component: Component,
    args: {}
} satisfies Meta<typeof Component>;

export default meta;

export const Header = {
    render: (props) => <Component {...props} />
} satisfies StoryObj<typeof meta>;
