import {ScaffoldGet, ScaffoldGetType} from '@/scaffold/decorators/scaffold-get';
import {
    ScaffoldIndex,
    ScaffoldIndexType
} from '@/scaffold/decorators/scaffold-index';
import {
    ScaffoldDto,
    ScaffoldEntity
} from '@/scaffold/services/scaffold-entity.service';
import {ScaffoldReadService} from '@/scaffold/services/scaffold-read.service';
import {Type} from '@nestjs/common';

export interface ScaffoldReadOptions<TDto extends ScaffoldDto> {
    getDto: Type<TDto>;
}

export function createReadController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity
>({getDto: GetDto}: ScaffoldReadOptions<TDto>) {
    const Index = ScaffoldIndex(GetDto);
    type Index = ScaffoldIndexType<InstanceType<typeof GetDto>>;

    const Get = ScaffoldGet(GetDto);
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
