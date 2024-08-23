import {ActionIcon, Container, Group, rem} from '@mantine/core';
import {
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandThreads,
    IconBrandTwitter
} from '@tabler/icons-react';
import classes from './Footer.module.css';

export function Footer() {
    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group
                    gap={0}
                    className={classes.links}
                    justify="flex-end"
                    wrap="nowrap"
                >
                    <ActionIcon
                        component={'a'}
                        href={'https://x.com/NickFoscarini'}
                        size="lg"
                        color="gray"
                        variant="subtle"
                    >
                        <IconBrandTwitter
                            style={{width: rem(18), height: rem(18)}}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        component={'a'}
                        href={
                            'https://www.linkedin.com/in/nick-foscarini-javascript-developer/'
                        }
                        size="lg"
                        color="gray"
                        variant="subtle"
                    >
                        <IconBrandLinkedin
                            style={{width: rem(18), height: rem(18)}}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        component={'a'}
                        href={'https://www.threads.net/@nick.foscarini'}
                        size="lg"
                        color="gray"
                        variant="subtle"
                    >
                        <IconBrandThreads
                            style={{width: rem(18), height: rem(18)}}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        component={'a'}
                        href={'https://www.instagram.com/nick.foscarini/'}
                        size="lg"
                        color="gray"
                        variant="subtle"
                    >
                        <IconBrandInstagram
                            style={{width: rem(18), height: rem(18)}}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}
