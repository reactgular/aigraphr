import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {
    ScaffoldCrudService,
    ScaffoldEntity
} from '@/scaffold/services/scaffold-crud.service';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {
    Body,
    Delete,
    Get,
    Param,
    Post,
    Type,
    ValidationPipe
} from '@nestjs/common';
import {
    ApiBody,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

export interface ScaffoldCrudOptions<Entity extends ScaffoldEntity> {
    entity: Type<Entity>;
    createEntity: Type<Partial<Entity>>;
    updateEntity: Type<Partial<Entity>>;
}

export function createCrudController<Entity extends ScaffoldEntity>({
    entity: Entity,
    createEntity: CreateEntity,
    updateEntity: UpdateEntity
}: ScaffoldCrudOptions<Entity>) {
    const name = toHumanUtils(Entity);

    class ScaffoldCrudController {
        public readonly type: Type<Entity>;

        public readonly name: string;

        public constructor(
            public readonly scaffold: ScaffoldCrudService<Entity>
        ) {
            this.type = Entity;
            this.name = name;
        }

        @Get()
        @ApiOperation({summary: `List all ${name}`})
        @DtoResponse([Entity])
        @ApiOkResponse({
            type: [Entity]
        })
        public async index(): Promise<Array<Entity>> {
            return await this.scaffold.findAll();
        }

        // @todo need to fix the typing of id to match Entity['id'], maybe needs a custom pipe
        // @todo I don't think any validation pipe is being used here
        @Get(':id')
        @ApiOperation({summary: `Get ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        @DtoResponse(Entity)
        public async get(@Param('id') id: Entity['id']): Promise<Entity> {
            return await this.scaffold.findOneOrThrow(id);
        }

        @Post()
        @ApiOperation({summary: `Create a new ${name}.`})
        @ApiBody({type: CreateEntity})
        @DtoResponse(Entity)
        public async create(
            @Body(
                new ValidationPipe({
                    expectedType: CreateEntity,
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transform: true,
                    transformOptions: {enableImplicitConversion: true}
                })
            )
            data: Partial<Entity>
        ): Promise<Entity> {
            return await this.scaffold.create(data);
        }

        // @todo need to fix the typing of id to match Entity['id'], maybe needs a custom pipe
        // @todo I don't think any validation pipe is being used here
        @Delete(':id')
        @ApiOperation({summary: `Delete ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        public async remove(@Param('id') id: Entity['id']): Promise<void> {
            await this.scaffold.remove(id);
        }
    }

    return ScaffoldCrudController;
}
