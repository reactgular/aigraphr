import {ScaffoldResponse} from '@/scaffold/decorators/scaffold-response';
import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
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
import {ApiOkResponse, ApiOperation, ApiParam} from '@nestjs/swagger';

export function ScaffoldGet<TDto extends ScaffoldEntity>(GetDto: Type<TDto>) {
    const Method = function () {
        const name = GetDto.name.replace(/Dto$/, '');
        const decorators = [
            Get(':id'),
            ApiParam({
                type: Number,
                name: 'id'
            }),
            ApiOperation({summary: `Get ${name} by ID`}),
            ApiOkResponse({type: GetDto}),
            ScaffoldResponse(GetDto)
        ];
        return applyDecorators(...decorators);
    };

    const Param = function (): ParameterDecorator {
        return CommonParam(scaffoldValidationPipe(ScaffoldIdDto));
    };

    const Query = function (): ParameterDecorator {
        return CommonQuery();
    };

    const Body = function (): ParameterDecorator {
        return CommonBody();
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
