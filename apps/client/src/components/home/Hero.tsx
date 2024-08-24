import {Button, Container, Text, Title} from '@mantine/core';
import Link from 'next/link';
import classes from './Hero.module.css';

export function Hero() {
    return (
        <div className={classes.root}>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Build{' '}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{from: 'pink', to: 'yellow'}}
                            >
                                AI Workflows
                            </Text>{' '}
                            in Minutes with AIGraphr
                        </Title>

                        <Text className={classes.description} mt={30}>
                            Say goodbye to complex setup and manual coding.
                            AIGraphr empowers TypeScript developers to visually
                            design AI workflows, instantly generate source code,
                            and debug in real-time—all within your web browser.
                            Whether you&apos;re integrating with OpenAI or
                            building custom models, AIGraphr streamlines your
                            process from idea to implementation.
                        </Text>

                        <Button
                            component={Link}
                            href="/editor"
                            variant="gradient"
                            gradient={{from: 'pink', to: 'yellow'}}
                            size="xl"
                            className={classes.control}
                            mt={40}
                        >
                            Try the Editor
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
