import {ReactRenderer} from '@storybook/react';
import {DecoratorFunction} from '@storybook/types';
import {AppProvider} from '../../src/components/app/AppProvider';

export const AppDecorator =
    // eslint-disable-next-line react/display-name
    (): DecoratorFunction<ReactRenderer> => (Story, context) => {
        return (
            <AppProvider>
                <Story />
            </AppProvider>
        );
    };
