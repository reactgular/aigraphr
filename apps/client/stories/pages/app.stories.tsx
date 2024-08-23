import {Meta, StoryObj} from '@storybook/react';
import Index from '../../app/page';

const meta = {
    title: 'Pages/App',
    component: Index,
    args: {}
} satisfies Meta<typeof Index>;

export default meta;

export const App = {
    render: (props) => <Index {...props} />
} satisfies StoryObj<typeof meta>;
