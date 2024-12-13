import {ScaffoldEntity} from '@/_deprecated/scaffold-entity.service';
import {ScaffoldParam} from '@/_deprecated/scaffold-param';
import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
import {scaValidationPipe} from '@/scaffold/pipes/sca-validation.pipe';
import {
    applyDecorators,
    Body as CommonBody,
    Get,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiParam} from '@nestjs/swagger';

const defaultParam = {
    method: [
        ApiParam({
            type: Number,
            name: 'id'
        })
    ],
    param: [scaValidationPipe(ScaffoldIdDto)],
    query: [],
    body: []
} satisfies ScaffoldParam;

/**
 * @deprecated
 */
export function ScaffoldGet<TDto extends ScaffoldEntity>(
    GetDto: Type<TDto>,
    params?: ScaffoldParam
) {
    const Method = function () {
        const name = GetDto.name.replace(/Dto$/, '');
        const decorators = [
            Get(':id'),
            ApiOperation({summary: `Get ${name} by ID`}),
            ApiOkResponse({type: GetDto}),
            ScaResponse(GetDto),
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

export type ScaffoldGetType<
    TDto extends ScaffoldEntity,
    TParam extends ScaffoldIdDto = ScaffoldIdDto
> = {
    Param: TParam;
    Query: never;
    Body: never;
    Response: Promise<TDto>;
};
