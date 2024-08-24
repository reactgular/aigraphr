import {Meta, StoryObj} from '@storybook/react';
import AppPage from './page';

const meta = {
    title: 'Pages/Home',
    component: AppPage,
    args: {}
} satisfies Meta<typeof AppPage>;

export default meta;

export const Home = {
    render: (props) => <AppPage {...props} />
} satisfies StoryObj<typeof meta>;
