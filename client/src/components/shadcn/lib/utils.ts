import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export type PropsWithClassName<P = unknown> = P & {
    className?: ClassValue | undefined;
};

export function cn(...inputs: Array<ClassValue>) {
    return twMerge(clsx(inputs));
}
