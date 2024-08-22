'use client';

import {Burger, Container, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import Link from 'next/link';
import classes from './Header.module.css';

const links = [
    {link: '#features', label: 'Features'},
    {link: '#faq', label: 'FAQ'}
];

export function Header() {
    const [opened, {toggle}] = useDisclosure(false);
    return (
        <header className={classes.header}>
            <Container size="md">
                <div className={classes.inner}>
                    <Group gap={5} visibleFrom="sm">
                        {links.map((link) => {
                            return (
                                <Link
                                    key={link.label}
                                    href={link.link}
                                    className={classes.link}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                        hiddenFrom="sm"
                    />
                </div>
            </Container>
        </header>
    );
}
