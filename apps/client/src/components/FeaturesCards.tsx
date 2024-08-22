'use client';

import {
    Badge,
    Card,
    Container,
    Group,
    rem,
    SimpleGrid,
    Text,
    Title,
    useMantineTheme
} from '@mantine/core';
import {
    IconDeviceDesktopAnalytics,
    IconLayoutDashboardFilled,
    IconPuzzleFilled
} from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';

const mockdata = [
    {
        title: 'Visual Workflow Editor',
        description:
            'Easily design AI workflows with a drag-and-drop interface. No more writing code from scratch—just connect the nodes, and AIGraphr takes care of the rest, generating clean, maintainable TypeScript code for your project.',
        icon: IconLayoutDashboardFilled
    },
    {
        title: 'Real-Time Debugging',
        description:
            'Test and refine your AI workflows directly in the browser. Get immediate feedback, troubleshoot issues on the fly, and ensure your AI models perform as expected before deploying them into production.',
        icon: IconDeviceDesktopAnalytics
    },
    {
        title: 'Extensible Plugin System',
        description:
            'Integrate with a wide range of AI models and providers, including OpenAI, with our flexible plugin system. AIGraphr adapts to your needs, whether you’re working with TypeScript, Python, or other languages, thanks to its versatile source code generators.',
        icon: IconPuzzleFilled
    }
];

export function FeaturesCards() {
    const theme = useMantineTheme();

    const features = mockdata.map((feature) => (
        <Card
            key={feature.title}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
        >
            <feature.icon
                style={{width: rem(50), height: rem(50)}}
                stroke={2}
                color={theme.colors.blue[6]}
            />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Container size="lg" py="xl">
            <Group justify="center">
                <Badge variant="filled" size="lg">
                    Features Still In Development
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Why Choose AIGraphr?
            </Title>

            <Text
                c="dimmed"
                className={classes.description}
                ta="center"
                mt="md"
            >
                Unlock the power of AI with a tool designed for developers who
                value speed, efficiency, and seamless integration. AIGraphr
                simplifies the process of building and managing AI workflows, so
                you can focus on what really matters—innovation.
            </Text>

            <SimpleGrid cols={{base: 1, md: 3}} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    );
}
