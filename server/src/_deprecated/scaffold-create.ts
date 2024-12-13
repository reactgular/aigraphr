import {ScaffoldEntity} from '@/_deprecated/scaffold-entity.service';
import {ScaffoldParam} from '@/_deprecated/scaffold-param';
import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaffoldEmptyDto} from '@/scaffold/dtos/scaffold-empty';
import {scaValidationPipe} from '@/scaffold/pipes/sca-validation.pipe';
import {
    applyDecorators,
    Body as CommonBody,
    Param as CommonParam,
    Post,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiOperation} from '@nestjs/swagger';

const defaultParam = {
    method: [],
    param: [],
    query: [],
    body: []
} satisfies ScaffoldParam;

/**
 * @deprecated
 */
export function ScaffoldCreate<
    TCreateDto extends Partial<ScaffoldEntity>,
    TGetDtp extends ScaffoldEntity
>(CreateDto: Type<TCreateDto>, GetDto: Type<TGetDtp>, params?: ScaffoldParam) {
    const Method = function () {
        const name = CreateDto.name.replace(/Dto$/, '');
        const decorators = [
            Post(),
            ApiOperation({summary: `Create a new ${name}.`}),
            ApiBody({type: CreateDto}),
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
        return CommonBody(
            ...(params?.body ?? defaultParam.body),
            scaValidationPipe(CreateDto)
        );
    };

    return {Method, Param, Query, Body};
}

export type ScaffoldCreateType<
    TCreateDto extends Partial<ScaffoldEntity>,
    TGetDto extends ScaffoldEntity,
    TParam extends ScaffoldEmptyDto = ScaffoldEmptyDto
> = {
    Param: TParam;
    Query: never;
    Body: TCreateDto;
    Response: Promise<TGetDto>;
};
