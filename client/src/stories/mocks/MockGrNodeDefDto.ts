import type {GrNodeDefDto} from '@/api';

export const mockGrNodeDefDto = (type: string): GrNodeDefDto => {
    return {
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
        type,
        version: 1
    };
};
