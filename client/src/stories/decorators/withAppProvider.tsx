import {AppProviders} from '@/components/app/AppProviders';
import type {DecoratorFunction} from '@storybook/csf';
import type {ReactRenderer} from '@storybook/react';

export const withAppProvider = (): DecoratorFunction<ReactRenderer> => {
    return (Story, context) => (
        <AppProviders>
            <Story {...context} />
        </AppProviders>
    );
};
