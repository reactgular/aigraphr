import {ScaffoldEntity} from '@/_deprecated/scaffold-entity.service';
import {ScaffoldParam} from '@/_deprecated/scaffold-param';
import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaffoldEmptyDto} from '@/scaffold/dtos/sca-empty';
import {
    applyDecorators,
    Body as CommonBody,
    Get,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from '@nestjs/swagger';

const defaultParam = {
    method: [],
    param: [],
    query: [],
    body: []
} satisfies ScaffoldParam;

/**
 * @deprecated
 */
export function ScaffoldIndex<TDto extends ScaffoldEntity>(
    IndexDto: Type<TDto>,
    params?: ScaffoldParam
) {
    const Method = function () {
        const name = IndexDto.name.replace(/Dto$/, '');
        const decorators = [
            Get(),
            ApiOperation({summary: `List all ${name}`}),
            ApiOkResponse({type: [IndexDto]}),
            ScaResponse([IndexDto]),
            ...(params?.method ?? defaultParam.method)
        ];
        return applyDecorators(...decorators);
    };

    const Param = function (): ParameterDecorator {
        return CommonParam(...(params?.param ?? defaultParam.param));
    };

    const Query = function (): ParameterDecorator {
        return CommonQuery(...(params?.query ?? defaultParam.query));
    };

    const Body = function (): ParameterDecorator {
        return CommonBody(...(params?.body ?? defaultParam.body));
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
