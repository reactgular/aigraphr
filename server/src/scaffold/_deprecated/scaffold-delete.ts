import {ScaffoldEntity} from '@/scaffold/_deprecated/scaffold-entity.service';
import {ScaffoldParam} from '@/scaffold/_deprecated/scaffold-param';
import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {
    applyDecorators,
    Body as CommonBody,
    Delete,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOperation, ApiParam} from '@nestjs/swagger';

const defaultParam = {
    method: [
        ApiParam({
            type: Number,
            name: 'id'
        })
    ],
    param: [scaffoldValidationPipe(ScaffoldIdDto)],
    query: [],
    body: []
} satisfies ScaffoldParam;

/**
 * @deprecated
 */
export function ScaffoldDelete<TDto extends ScaffoldEntity>(
    DeleteDto: Type<TDto>,
    params?: ScaffoldParam
) {
    const Method = function () {
        const name = DeleteDto.name.replace(/Dto$/, '');
        const decorators = [
            Delete(':id'),
            ApiOperation({summary: `Delete ${name} by ID`}),
            ApiNotFoundResponse({description: `${name} not found`}),
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

export type ScaffoldDeleteType<TParam extends ScaffoldIdDto = ScaffoldIdDto> = {
    Param: TParam;
    Query: never;
    Body: never;
    Response: Promise<void>;
};
