import {Meta, StoryObj} from '@storybook/react';
import Index from './page';

const meta = {
    title: 'Pages/Home',
    component: Index,
    args: {}
} satisfies Meta<typeof Index>;

export default meta;

export const Home = {
    render: (props) => <Index {...props} />
} satisfies StoryObj<typeof meta>;
