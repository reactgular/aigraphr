import {rem, Tooltip, UnstyledButton} from '@mantine/core';
import {IconHome2} from '@tabler/icons-react';
import classes from './UiNavbarMinimal.module.css';

export interface UiNavbarLinkProps {
    active?: boolean;

    icon: typeof IconHome2;

    label: string;

    onClick?(): void;
}

export const UiNavbarLink = ({
    icon: Icon,
    label,
    active,
    onClick
}: UiNavbarLinkProps) => {
    return (
        <Tooltip label={label} position="right" transitionProps={{duration: 0}}>
            <UnstyledButton
                onClick={onClick}
                className={classes.link}
                data-active={active || undefined}
            >
                <Icon style={{width: rem(20), height: rem(20)}} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
};
