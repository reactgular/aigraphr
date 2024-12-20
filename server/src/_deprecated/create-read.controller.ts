import {
    ScaffoldDto,
    ScaffoldEntity
} from '@/_deprecated/scaffold-entity.service';
import {ScaffoldGet, ScaffoldGetType} from '@/_deprecated/scaffold-get';
import {ScaffoldIndex, ScaffoldIndexType} from '@/_deprecated/scaffold-index';
import {ScaffoldParam} from '@/_deprecated/scaffold-param';
import {ScaffoldReadService} from '@/_deprecated/scaffold-read.service';
import {ScaffoldEmptyDto} from '@/scaffold/dtos/scaffold-empty';
import {Type} from '@nestjs/common';

/**
 * @deprecated
 */
export interface ScaffoldReadOptions<TDto extends ScaffoldDto> {
    getDto: Type<TDto>;
    indexParam?: ScaffoldParam;
    getParam?: ScaffoldParam;
}

/**
 * @deprecated
 */
export function createReadController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity,
    TParamDto extends ScaffoldEmptyDto
>({getDto: GetDto, indexParam, getParam}: ScaffoldReadOptions<TDto>) {
    const Index = ScaffoldIndex(GetDto, indexParam);
    type Index = ScaffoldIndexType<InstanceType<typeof GetDto>, TParamDto>;

    const Get = ScaffoldGet(GetDto, getParam);
    type Get = ScaffoldGetType<InstanceType<typeof GetDto>>;

    abstract class ScaffoldReadController {
        protected constructor(
            public readonly scaffoldCrud: ScaffoldReadService<
                TEntity,
                InstanceType<typeof GetDto>
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
    }

    return ScaffoldReadController;
}
