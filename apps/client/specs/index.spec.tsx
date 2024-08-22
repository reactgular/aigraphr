import {MantineProvider} from '@mantine/core';
import {render as testingLibraryRender} from '@testing-library/react';
import React from 'react';
import Page from '../app/page';
import {mantineTheme} from '../src/mantine-theme';

function render(ui: React.ReactNode) {
    return testingLibraryRender(<>{ui}</>, {
        wrapper: ({children}: {children: React.ReactNode}) => (
            <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
        )
    });
}

describe('Page', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<Page />);
        expect(baseElement).toBeTruthy();
    });
});
