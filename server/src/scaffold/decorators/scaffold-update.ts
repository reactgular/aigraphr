import {ScaffoldParam} from '@/scaffold/decorators/scaffold-param';
import {ScaffoldResponse} from '@/scaffold/decorators/scaffold-response';
import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';
import {
    applyDecorators,
    Body as CommonBody,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {Patch} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {ApiBody, ApiOkResponse, ApiOperation, ApiParam} from '@nestjs/swagger';

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

export function ScaffoldUpdate<
    TUpdateDto extends Partial<ScaffoldEntity>,
    TGetDtp extends ScaffoldEntity
>(UpdateDto: Type<TUpdateDto>, GetDto: Type<TGetDtp>, params?: ScaffoldParam) {
    const Method = function () {
        const name = UpdateDto.name.replace(/Dto$/, '');
        const decorators = [
            Patch(':id'),
            ApiParam({
                type: Number,
                name: 'id'
            }),
            ApiOperation({summary: `Updates a ${name}.`}),
            ApiBody({type: UpdateDto}),
            ApiOkResponse({type: GetDto}),
            ScaffoldResponse(GetDto),
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
        return CommonBody(
            ...(params?.body ?? defaultParam.body),
            scaffoldValidationPipe(UpdateDto)
        );
    };

    return {Method, Param, Query, Body};
}

export type ScaffoldUpdateType<
    TUpdateDto extends Partial<ScaffoldEntity>,
    TGetDto extends ScaffoldEntity,
    TParam extends ScaffoldIdDto = ScaffoldIdDto
> = {
    Param: TParam;
    Query: never;
    Body: TUpdateDto;
    Response: Promise<TGetDto>;
};
