import {ScaffoldGet, ScaffoldGetType} from '@/scaffold/decorators/scaffold-get';
import {
    ScaffoldIndex,
    ScaffoldIndexType
} from '@/scaffold/decorators/scaffold-index';
import {ScaffoldCrudService} from '@/scaffold/services/scaffold-crud.service';
import {ScaffoldDtoService} from '@/scaffold/services/scaffold-dto.service';
import {
    ScaffoldDto,
    ScaffoldEntity,
    ScaffoldEntityService
} from '@/scaffold/services/scaffold-entity.service';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {Delete, Param, ParseIntPipe, Type} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOperation, ApiParam} from '@nestjs/swagger';
import {
    ScaffoldCreate,
    ScaffoldCreateType
} from '../decorators/scaffold-create';

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

    const Index = ScaffoldIndex(GetDto);
    type Index = ScaffoldIndexType<InstanceType<typeof GetDto>>;

    const Get = ScaffoldGet(GetDto);
    type Get = ScaffoldGetType<InstanceType<typeof GetDto>>;

    const Create = ScaffoldCreate(CreateDto, GetDto);
    type Create = ScaffoldCreateType<
        InstanceType<typeof CreateDto>,
        InstanceType<typeof GetDto>
    >;

    abstract class ScaffoldCrudController {
        public readonly entity: Type<TEntity>;

        public readonly name: string;

        protected constructor(
            public readonly scaffoldEntity: ScaffoldEntityService<TEntity>,
            public readonly scaffoldDto: ScaffoldDtoService<
                TEntity,
                InstanceType<typeof GetDto>,
                InstanceType<typeof CreateDto>,
                InstanceType<typeof UpdateDto>
            >,
            public readonly scaffoldCrud: ScaffoldCrudService<
                TEntity,
                InstanceType<typeof GetDto>,
                InstanceType<typeof CreateDto>,
                InstanceType<typeof UpdateDto>
            >
        ) {
            this.entity = Entity;
            this.name = name;
        }

        @Index.Method()
        public async index(
            @Index.Param() params: Index['Param'],
            @Index.Query() query: Index['Query'],
            @Index.Body() body: Index['Body']
        ): Index['Response'] {
            return this.scaffoldCrud.index(params, query, body);
        }

        @Get.Method()
        public async get(
            @Get.Param() params: Get['Param'],
            @Get.Query() query: Get['Query'],
            @Get.Body() body: Get['Body']
        ): Get['Response'] {
            return this.scaffoldCrud.get(params, query, body);
        }

        @Create.Method()
        public async create(
            @Create.Param() params: Create['Param'],
            @Create.Query() query: Create['Query'],
            @Create.Body() body: Create['Body']
        ): Create['Response'] {
            return this.scaffoldCrud.create(params, query, body);
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
            await this.scaffoldEntity.remove(id);
        }
    }

    return ScaffoldCrudController;
}
