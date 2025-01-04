import type {DecoratorFunction} from '@storybook/csf';
import type {ReactRenderer} from '@storybook/react';
import {type ReactNode, Suspense} from 'react';

export const withSuspense = (
    fallback: ReactNode = <div>Loading...</div>
): DecoratorFunction<ReactRenderer> => {
    return (Story, context) => (
        <Suspense fallback={fallback}>
            <Story {...context} />
        </Suspense>
    );
};
