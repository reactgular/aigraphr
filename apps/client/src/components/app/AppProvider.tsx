import {MantineProvider} from '@mantine/core';
import {FC, PropsWithChildren} from 'react';
import {mantineTheme} from '../../configs/mantine-theme';

export const AppProvider: FC<PropsWithChildren> = ({children}) => {
    return <MantineProvider theme={mantineTheme}>{children}</MantineProvider>;
};
