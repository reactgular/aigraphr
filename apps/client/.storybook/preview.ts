import {ReactRenderer} from '@storybook/react';
import {DecoratorFunction} from '@storybook/types';
import {AppDecorator} from './decorators/AppDecorator';
import './../app/global.css';

export const decorators: DecoratorFunction<ReactRenderer>[] = [AppDecorator()];
