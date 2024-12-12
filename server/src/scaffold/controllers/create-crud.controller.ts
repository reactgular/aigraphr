import {createReadController} from '@/scaffold/controllers/create-read.controller';
import {
    ScaffoldDelete,
    ScaffoldDeleteType
} from '@/scaffold/decorators/scaffold-delete';
import {GetParams} from '@/scaffold/decorators/scaffold-index';
import {ScaffoldEmptyDto} from '@/scaffold/dtos/scaffold-empty';
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
import {
    ScaffoldUpdate,
    ScaffoldUpdateType
} from '../decorators/scaffold-update';

export interface ScaffoldCrudOptions<
    TDto extends ScaffoldDto,
    TParamDto extends ScaffoldEmptyDto
> {
    getDto: Type<TDto>;
    getParams: GetParams<TParamDto>;
    createDto: Type<Partial<TDto>>;
    updateDto: Type<Partial<TDto>>;
}

export function createCrudController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity,
    TParamDto extends ScaffoldEmptyDto
>({
    getDto: GetDto,
    getParams,
    createDto: CreateDto,
    updateDto: UpdateDto
}: ScaffoldCrudOptions<TDto, TParamDto>) {
    const Create = ScaffoldCreate(CreateDto, GetDto);
    type Create = ScaffoldCreateType<
        InstanceType<typeof CreateDto>,
        InstanceType<typeof GetDto>
    >;

    const Update = ScaffoldUpdate(UpdateDto, GetDto);
    type Update = ScaffoldUpdateType<
        InstanceType<typeof UpdateDto>,
        InstanceType<typeof GetDto>
    >;

    const Delete = ScaffoldDelete(GetDto);
    type Delete = ScaffoldDeleteType;

    abstract class ScaffoldCrudController extends createReadController({
        getDto: GetDto,
        getParams
    }) {
        protected constructor(
            public readonly scaffoldCrud: ScaffoldCrudService<
                TEntity,
                InstanceType<typeof GetDto>,
                InstanceType<typeof CreateDto>,
                InstanceType<typeof UpdateDto>
            >
        ) {
            super(scaffoldCrud);
        }

        @Create.Method()
        public async create(
            @Create.Param() params: Create['Param'],
            @Create.Query() query: Create['Query'],
            @Create.Body() body: Create['Body']
        ): Create['Response'] {
            return this.scaffoldCrud.create(params, query, body);
        }

        @Update.Method()
        public async update(
            @Update.Param() params: Update['Param'],
            @Update.Query() query: Update['Query'],
            @Update.Body() body: Update['Body']
        ): Update['Response'] {
            return this.scaffoldCrud.update(params, query, body);
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
