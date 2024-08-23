import {Meta, StoryObj} from '@storybook/react';
import {Faq as Component} from './Faq';

const meta = {
    title: 'Components/Home/Faq',
    component: Component,
    args: {}
} satisfies Meta<typeof Component>;

export default meta;

export const Faq = {
    render: (props) => <Component {...props} />
} satisfies StoryObj<typeof meta>;
