import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {
    ScaffoldCrudService,
    ScaffoldDto,
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

export interface ScaffoldCrudOptions<
    TDto extends ScaffoldDto,
    TEntity extends ScaffoldEntity
> {
    entity: Type<TEntity>;
    getDto: Type<TDto>;
    createDto: Type<Partial<TDto>>;
    updateDto: Type<Partial<TDto>>;
}

export function createCrudController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity
>({
    entity: Entity,
    getDto: GetDto,
    createDto: CreateDto,
    updateDto: UpdateDto
}: ScaffoldCrudOptions<TDto, TEntity>) {
    const name = toHumanUtils(Entity);

    class ScaffoldCrudController {
        public readonly entity: Type<TEntity>;

        public readonly name: string;

        public constructor(
            public readonly scaffold: ScaffoldCrudService<TEntity>
        ) {
            this.entity = Entity;
            this.name = name;
        }

        @Get()
        @ApiOperation({summary: `List all ${name}`})
        @ApiOkResponse({
            type: [GetDto]
        })
        @DtoResponse([GetDto])
        public async index(): Promise<Array<TEntity>> {
            return await this.scaffold.findAll();
        }

        // @todo need to fix the typing of id to match Entity['id'], maybe needs a custom pipe
        // @todo I don't think any validation pipe is being used here
        @Get(':id')
        @ApiOperation({summary: `Get ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        @DtoResponse(GetDto)
        public async get(@Param('id') id: TDto['id']): Promise<TEntity> {
            return await this.scaffold.findOneOrThrow(id);
        }

        @Post()
        @ApiOperation({summary: `Create a new ${name}.`})
        @ApiBody({type: CreateDto})
        @DtoResponse(GetDto)
        public async create(
            @Body(
                new ValidationPipe({
                    expectedType: CreateDto,
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transform: true,
                    transformOptions: {enableImplicitConversion: true}
                })
            )
            data: InstanceType<typeof CreateDto>
        ): Promise<TEntity> {
            return await this.scaffold.create(this.beforeCreate(data));
        }

        // @todo I don't think any validation pipe is being used here
        @Delete(':id')
        @ApiOperation({summary: `Delete ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        public async remove(@Param('id') id: TDto['id']): Promise<void> {
            await this.scaffold.remove(id);
        }

        public beforeCreate(
            data: InstanceType<typeof CreateDto>
        ): Partial<TEntity> {
            return data as Partial<TEntity>;
        }
    }

    return ScaffoldCrudController;
}
