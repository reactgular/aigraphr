import {Button, Container, Text, Title} from '@mantine/core';
import classes from './HeroImageRight.module.css';

export function HeroImageRight() {
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
                            Whether you're integrating with OpenAI or building
                            custom models, AIGraphr streamlines your process
                            from idea to implementation.
                        </Text>

                        <Button
                            variant="gradient"
                            gradient={{from: 'pink', to: 'yellow'}}
                            size="xl"
                            className={classes.control}
                            mt={40}
                        >
                            Try the Live Demo
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
