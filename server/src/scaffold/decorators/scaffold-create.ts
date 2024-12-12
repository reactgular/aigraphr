import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';
import {
    applyDecorators,
    Body as CommonBody,
    Param as CommonParam,
    Post,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiOperation} from '@nestjs/swagger';

export function ScaffoldCreate<
    TCreateDto extends Partial<ScaffoldEntity>,
    TGetDtp extends ScaffoldEntity
>(CreateDto: Type<TCreateDto>, GetDto: Type<TGetDtp>) {
    const Method = function () {
        const name = CreateDto.name.replace(/Dto$/, '');
        const decorators = [
            Post(),
            ApiOperation({summary: `Create a new ${name}.`}),
            ApiBody({type: CreateDto}),
            ApiOkResponse({type: GetDto}),
            DtoResponse(GetDto)
        ];
        return applyDecorators(...decorators);
    };

    const Param = function (): ParameterDecorator {
        return CommonParam();
    };

    const Query = function (): ParameterDecorator {
        return CommonQuery();
    };

    const Body = function (): ParameterDecorator {
        return CommonBody(scaffoldValidationPipe(CreateDto));
    };

    return {Method, Param, Query, Body};
}

export type ScaffoldCreateType<
    TCreateDto extends Partial<ScaffoldEntity>,
    TGetDto extends ScaffoldEntity
> = {
    Param: never;
    Query: never;
    Body: TCreateDto;
    Response: Promise<TGetDto>;
};
