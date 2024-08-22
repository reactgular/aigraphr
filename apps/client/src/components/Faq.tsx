'use client';

import {Accordion, Container, Title} from '@mantine/core';
import classes from './Faq.module.css';

const FAQ = [
    {
        question: 'What programming languages does AIGraphr support?',
        answer: 'AIGraphr primarily supports TypeScript, but it also offers the flexibility to generate code in Python. Future versions may include support for additional languages based on community feedback and contributions.'
    },
    {
        question: 'Do I need to have AI experience to use AIGraphr?',
        answer: 'Not at all! AIGraphr is designed to be intuitive and user-friendly, making it accessible to both AI beginners and seasoned developers. The visual editor simplifies the process of creating and managing AI workflows, allowing you to focus on building without needing deep AI expertise.'
    },
    {
        question: 'Can I integrate AIGraphr with existing NodeJs projects?',
        answer: 'Yes, AIGraphr is built to integrate seamlessly with your existing NodeJs projects. It generates TypeScript files that you can easily include in your project, allowing you to build and expand your AI workflows without disrupting your current setup.'
    },
    {
        question:
            'Is AIGraphr compatible with Git and version control systems?',
        answer: 'Absolutely! AIGraphr saves projects in a format that is version control friendly, making it easy to track changes, collaborate with others, and manage your AI workflows through Git or any other version control system.'
    },
    {
        question: 'What AI models and providers are supported by AIGraphr?',
        answer: 'AIGraphr version 1.0 ships with support for OpenAI models, but its plugin system is designed to be extensible. This means you can add support for additional AI models and providers as needed, making AIGraphr adaptable to a wide range of AI development scenarios.'
    }
];

export function Faq() {
    return (
        <Container size="sm" className={classes.wrapper}>
            <Title id="faq" ta="center" className={classes.title}>
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated">
                {FAQ.map((faq, index) => (
                    <Accordion.Item
                        key={index}
                        className={classes.item}
                        value={index.toString()}
                    >
                        <Accordion.Control>{faq.question}</Accordion.Control>
                        <Accordion.Panel>{faq.answer}</Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}
