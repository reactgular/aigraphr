import type {
    GrNodeDefDto,
    GrNodeDefGetNodeDefGroupsResponses,
    NodesGetResponses
} from '@/api';
import {GrNode} from '@/components/graph/GrNode';
import type {Meta, StoryObj} from '@storybook/react';
import {withSuspense} from '../decorators/withSuspense';

// @see https://storybook-addon-mock.netlify.app/?path=/docs/docs-introduction--docs
export default {
    title: 'Graph/GrNode',
    component: GrNode,
    decorators: [withSuspense()],
    parameters: {
        layout: 'centered',
        mockData: [
            {
                url: 'http://localhost:6006/api/projects/1/workspaces/1/nodes/1',
                method: 'GET',
                status: 200,
                response: {
                    id: 1,
                    workspaceId: 1,
                    type: 'core:if-then-else',
                    name: 'forEach1'
                } satisfies NodesGetResponses['200']
            },
            {
                url: 'http://localhost:6006/api/node-def/groups',
                method: 'GET',
                status: 200,
                response: [
                    {
                        description: 'Core nodes',
                        name: 'core',
                        nodes: [
                            {
                                description:
                                    'If the condition is true, then return the then value, otherwise return the else value',
                                group: 'core',
                                inputs: [
                                    {
                                        description: 'The condition to check',
                                        isArray: false,
                                        name: 'condition',
                                        type: 'boolean'
                                    },
                                    {
                                        description: 'The else value',
                                        isArray: false,
                                        name: 'else',
                                        type: 'userType'
                                    },
                                    {
                                        description: 'The then value',
                                        isArray: false,
                                        name: 'then',
                                        type: 'userType'
                                    }
                                ],
                                outputs: [
                                    {
                                        description: 'The output value',
                                        isArray: false,
                                        name: 'value',
                                        type: 'userType'
                                    }
                                ],
                                type: 'core:if-then-else',
                                version: 1
                            },
                            {
                                description: 'A constant value',
                                group: 'core',
                                inputs: [
                                    {
                                        description: 'The value to use',
                                        isArray: false,
                                        name: 'value',
                                        type: 'string'
                                    }
                                ],
                                outputs: [
                                    {
                                        description: '',
                                        isArray: false,
                                        name: 'value',
                                        type: 'userType'
                                    }
                                ],
                                type: 'core:constant',
                                version: 1
                            },
                            {
                                description: 'An object',
                                group: 'core',
                                inputs: [
                                    {
                                        description: 'The object to use',
                                        isArray: false,
                                        name: 'object',
                                        type: 'object'
                                    }
                                ],
                                outputs: [],
                                type: 'core:object',
                                version: 1
                            }
                        ] satisfies GrNodeDefDto[]
                    }
                ] satisfies GrNodeDefGetNodeDefGroupsResponses['200']
            }
        ]
    },
    tags: ['autodocs'],
    args: {
        active: false,
        selected: false,
        error: false,
        address: {
            projectId: 1,
            workspaceId: 1,
            nodeId: 1
        }
    }
} satisfies Meta<typeof GrNode>;

type Story = StoryObj<typeof GrNode>;

export const Selected: Story = {
    args: {
        selected: true
    }
};

export const Error: Story = {
    args: {
        selected: true,
        error: true
    }
};

export const Active: Story = {
    args: {
        active: true
    }
};
