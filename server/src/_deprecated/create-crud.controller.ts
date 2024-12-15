import {createReadController} from '@/_deprecated/create-read.controller';
import {ScaffoldCrudService} from '@/_deprecated/scaffold-crud.service';
import {
    ScaffoldDelete,
    ScaffoldDeleteType
} from '@/_deprecated/scaffold-delete';
import {
    ScaffoldDto,
    ScaffoldEntity
} from '@/_deprecated/scaffold-entity.service';
import {ScaffoldParam} from '@/_deprecated/scaffold-param';
import {Type} from '@nestjs/common';
import {ScaffoldCreate, ScaffoldCreateType} from './scaffold-create';
import {ScaffoldUpdate, ScaffoldUpdateType} from './scaffold-update';

/**
 * @deprecated
 */
export interface ScaffoldCrudOptions<TDto extends ScaffoldDto> {
    createDto: Type<Partial<TDto>>;
    createParam?: ScaffoldParam;
    deleteParam?: ScaffoldParam;
    getDto: Type<TDto>;
    getParam?: ScaffoldParam;
    indexParam?: ScaffoldParam;
    updateDto: Type<Partial<TDto>>;
    updateParam?: ScaffoldParam;
}

/**
 * @deprecated
 */
export function createCrudController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity
>({
    getDto: GetDto,
    createDto: CreateDto,
    updateDto: UpdateDto,
    indexParam,
    getParam,
    createParam,
    deleteParam,
    updateParam
}: ScaffoldCrudOptions<TDto>) {
    const Create = ScaffoldCreate(CreateDto, GetDto, createParam);
    type Create = ScaffoldCreateType<
        InstanceType<typeof CreateDto>,
        InstanceType<typeof GetDto>
    >;

    const Update = ScaffoldUpdate(UpdateDto, GetDto, updateParam);
    type Update = ScaffoldUpdateType<
        InstanceType<typeof UpdateDto>,
        InstanceType<typeof GetDto>
    >;

    const Delete = ScaffoldDelete(GetDto, deleteParam);
    type Delete = ScaffoldDeleteType;

    abstract class ScaffoldCrudController extends createReadController({
        getDto: GetDto,
        indexParam,
        getParam
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

        @Delete.Method()
        public async remove(
            @Delete.Param() params: Delete['Param'],
            @Delete.Query() query: Delete['Query'],
            @Delete.Body() body: Delete['Body']
        ): Delete['Response'] {
            return this.scaffoldCrud.remove(params, query, body);
        }

        @Update.Method()
        public async update(
            @Update.Param() params: Update['Param'],
            @Update.Query() query: Update['Query'],
            @Update.Body() body: Update['Body']
        ): Update['Response'] {
            return this.scaffoldCrud.update(params, query, body);
        }
    }

    return ScaffoldCrudController;
}
