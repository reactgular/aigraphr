import {
    ScaffoldDelete,
    ScaffoldDeleteType
} from '@/scaffold/decorators/scaffold-delete';
import {ScaffoldGet, ScaffoldGetType} from '@/scaffold/decorators/scaffold-get';
import {
    ScaffoldIndex,
    ScaffoldIndexType
} from '@/scaffold/decorators/scaffold-index';
import {ScaffoldCrudService} from '@/scaffold/services/scaffold-crud.service';
import {
    ScaffoldDto,
    ScaffoldEntity
} from '@/scaffold/services/scaffold-entity.service';
import {Type} from '@nestjs/common';
import {
    ScaffoldCreate,
    ScaffoldCreateType
} from '../decorators/scaffold-create';

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
    const Index = ScaffoldIndex(GetDto);
    type Index = ScaffoldIndexType<InstanceType<typeof GetDto>>;

    const Get = ScaffoldGet(GetDto);
    type Get = ScaffoldGetType<InstanceType<typeof GetDto>>;

    const Create = ScaffoldCreate(CreateDto, GetDto);
    type Create = ScaffoldCreateType<
        InstanceType<typeof CreateDto>,
        InstanceType<typeof GetDto>
    >;

    const Delete = ScaffoldDelete(GetDto);
    type Delete = ScaffoldDeleteType;

    abstract class ScaffoldCrudController {
        protected constructor(
            public readonly scaffoldCrud: ScaffoldCrudService<
                TEntity,
                InstanceType<typeof GetDto>,
                InstanceType<typeof CreateDto>,
                InstanceType<typeof UpdateDto>
            >
        ) {}

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

        @Delete.Method()
        public async remove(
            @Delete.Param() params: Delete['Param'],
            @Delete.Query() query: Delete['Query'],
            @Delete.Body() body: Delete['Body']
        ): Delete['Response'] {
            return this.scaffoldCrud.remove(params, query, body);
        }
    }

    return ScaffoldCrudController;
}
