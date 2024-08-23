'use client';

import {MantineProvider} from '@mantine/core';
import {FC, PropsWithChildren} from 'react';
import {mantineTheme} from '../mantine-theme';

export const AppProvider: FC<PropsWithChildren> = ({children}) => {
    return <MantineProvider theme={mantineTheme}>{children}</MantineProvider>;
};
