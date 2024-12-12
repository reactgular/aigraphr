import {ScaffoldResponse} from '@/scaffold/decorators/scaffold-response';
import {ScaffoldEmptyDto} from '@/scaffold/dtos/scaffold-empty';
import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';
import {
    applyDecorators,
    Body as CommonBody,
    Get,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiParamOptions
} from '@nestjs/swagger';

export interface GetParams<TParamDto extends ScaffoldEmptyDto> {
    params: Array<ApiParamOptions>;
    dto: Type<TParamDto>;
}

export function ScaffoldIndex<
    TDto extends ScaffoldEntity,
    TParamDto extends ScaffoldEmptyDto
>(GetDto: Type<TDto>, params: GetParams<TParamDto>) {
    const Method = function () {
        const name = GetDto.name.replace(/Dto$/, '');
        const decorators = [
            Get(),
            ...params.params.map((param) => ApiParam(param)),
            ApiOperation({summary: `List all ${name}`}),
            ApiOkResponse({type: [GetDto]}),
            ScaffoldResponse([GetDto])
        ];
        return applyDecorators(...decorators);
    };

    const Param = function (): ParameterDecorator {
        return CommonParam(scaffoldValidationPipe(params.dto));
    };

    const Query = function (): ParameterDecorator {
        return CommonQuery();
    };

    const Body = function (): ParameterDecorator {
        return CommonBody();
    };

    return {Method, Param, Query, Body};
}

export type ScaffoldIndexType<
    TDto extends ScaffoldEntity,
    TParam extends ScaffoldEmptyDto = ScaffoldEmptyDto
> = {
    Param: TParam;
    Query: never;
    Body: never;
    Response: Promise<Array<TDto>>;
};
