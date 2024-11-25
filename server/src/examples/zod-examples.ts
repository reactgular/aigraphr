import {z} from 'zod';

function createNode() {
    return {
        input: <TType extends z.ZodRawShape>(shape: TType) => {
            const schema = z.object(shape);
            return {
                query: (cb: (input: z.infer<typeof schema>) => void) => null
            };
        }
    };
}

const node = createNode()
    .input({
        name: z.string().describe('Name of the user'),
        description: z.string().min(10).optional(),
        active: z.boolean().default(true),
        child: z.object({
            age: z.number().int().positive()
        })
    })
    .query((data) => {
        // Now, data.name is of type string
        console.log(data.name.toUpperCase()); // Example usage
        console.log(data.child.age.toFixed(2)); // Example usage
    });
