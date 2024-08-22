import {createTheme, MantineProvider} from '@mantine/core';
import {FC} from 'react';
import {HomePage} from '../components/app/HomePage';

const theme = createTheme({
    /** Put your mantine theme override here */
});

const Index: FC = () => {
    return (
        <MantineProvider theme={theme}>
            <HomePage />
        </MantineProvider>
    );
};

export default Index;
