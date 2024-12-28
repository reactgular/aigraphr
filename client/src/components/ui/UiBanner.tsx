import type {FC} from 'react';

interface UiBannerProps {
    description?: string;

    title: string;
}

export const UiBanner: FC<UiBannerProps> = ({title, description}) => {
    return (
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground">
                    {description ? description : '&nbsp;'}
                </p>
            </div>
        </div>
    );
};
