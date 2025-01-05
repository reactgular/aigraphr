import type {GrNodeDefDto, GrNodeDefGroupDto} from '@/api';

export const mockGrNodeDefDto = (): Array<GrNodeDefGroupDto> => {
    return [
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
    ];
};
