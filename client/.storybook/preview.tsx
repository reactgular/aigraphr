import {withThemeByDataAttribute} from '@storybook/addon-themes';
import type {DecoratorFunction} from '@storybook/csf';
import type {Preview, ReactRenderer} from '@storybook/react';
import '../src/styles.css';
import '@fontsource/inter';
import '@fontsource/inter/100.css';
import '@fontsource/inter/100-italic.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/200-italic.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/300-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/400-italic.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/500-italic.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/600-italic.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/700-italic.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/800-italic.css';
import '@fontsource/inter/900.css';
import '@fontsource/inter/900-italic.css';
// noinspection ES6PreferShortImport
import {withAppProvider} from '../src/stories/decorators/withAppProvider';
// noinspection ES6PreferShortImport

export const decorators: DecoratorFunction<ReactRenderer>[] = [
    withThemeByDataAttribute({
        themes: {
            light: 'light',
            dark: 'dark'
        },
        defaultTheme: 'light',
        attributeName: 'data-mode'
    }),
    withAppProvider()
];

const preview: Preview = {
    tags: ['autodocs'],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
