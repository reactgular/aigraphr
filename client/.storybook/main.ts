import type {StorybookConfig} from '@storybook/react-vite';
import {dirname, join, resolve} from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
    return dirname(resolve(join('..', 'node_modules', value, 'package.json')));
}

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('storybook-dark-mode'),
        getAbsolutePath('@storybook/addon-themes'),
        getAbsolutePath('storybook-addon-mock')
    ],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {}
    }
};

export default config;
