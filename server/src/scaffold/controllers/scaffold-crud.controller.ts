import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {ScaffoldBody} from '@/scaffold/decorators/scaffold-body.decorator';
import {
    ScaffoldCrudService,
    ScaffoldDto,
    ScaffoldEntity
} from '@/scaffold/services/scaffold-crud.service';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {Delete, Get, Param, ParseIntPipe, Post, Type} from '@nestjs/common';
import {
    ApiBody,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam
} from '@nestjs/swagger';

export interface ScaffoldCrudOptions<
    TDto extends ScaffoldDto,
    TEntity extends ScaffoldEntity
> {
    primaryKey?: StringConstructor | NumberConstructor;
    entity: Type<TEntity>;
    getDto: Type<TDto>;
    createDto: Type<Partial<TDto>>;
    updateDto: Type<Partial<TDto>>;
}

/**
 * @deprecated I'm going to try a different approach
 */
export function createCrudController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity
>({
    primaryKey = Number,
    entity: Entity,
    getDto: GetDto,
    createDto: CreateDto,
    updateDto: UpdateDto
}: ScaffoldCrudOptions<TDto, TEntity>) {
    const name = toHumanUtils(Entity);

    abstract class ScaffoldCrudController {
        public readonly entity: Type<TEntity>;

        public readonly name: string;

        protected constructor(
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

        @Get(':id')
        @ApiParam({
            type: primaryKey,
            name: 'id'
        })
        @ApiOperation({summary: `Get ${name} by ID`})
        @ApiOperation({summary: `Get ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        @DtoResponse(GetDto)
        public async get(
            @Param('id', ParseIntPipe) id: TDto['id']
        ): Promise<TEntity> {
            return await this.scaffold.findOneOrThrow(id);
        }

        @Post()
        @ApiOperation({summary: `Create a new ${name}.`})
        @ApiBody({type: CreateDto})
        @DtoResponse(GetDto)
        public async create(
            @ScaffoldBody(CreateDto)
            data: InstanceType<typeof CreateDto>
        ): Promise<TEntity> {
            return await this.scaffold.create(this.beforeCreate(data));
        }

        @Delete(':id')
        @ApiParam({
            type: primaryKey,
            name: 'id'
        })
        @ApiOperation({summary: `Delete ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        public async remove(
            @Param('id', ParseIntPipe) id: TDto['id']
        ): Promise<void> {
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
