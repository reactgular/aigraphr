import type {GrNodeDefDto} from '@/api';
import {
    Bookmark,
    Bot,
    Calculator,
    Clock,
    Cog,
    Cpu,
    File,
    Image,
    Network,
    Text
} from 'lucide-react';
import type {FC} from 'react';

export type GrNodeDefIcon = GrNodeDefDto['icon'];

export const GrNodeDefIcons: Record<GrNodeDefIcon, FC<{className?: string}>> = {
    core: Cpu,
    custom: Cog,
    file: File,
    image: Image,
    math: Calculator,
    network: Network,
    other: Cog,
    social: Bot,
    text: Text,
    time: Clock,
    web: Bookmark
};
