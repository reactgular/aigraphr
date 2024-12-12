import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';
import {
    applyDecorators,
    Body as CommonBody,
    Delete,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOperation, ApiParam} from '@nestjs/swagger';

export function ScaffoldDelete<TDto extends ScaffoldEntity>(Dto: Type<TDto>) {
    const Method = function () {
        const name = Dto.name.replace(/Dto$/, '');
        const decorators = [
            Delete(':id'),
            ApiParam({
                type: Number,
                name: 'id'
            }),
            ApiOperation({summary: `Delete ${name} by ID`}),
            ApiNotFoundResponse({description: `${name} not found`})
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

export type ScaffoldDeleteType<TParam extends ScaffoldIdDto = ScaffoldIdDto> = {
    Param: TParam;
    Query: never;
    Body: never;
    Response: Promise<void>;
};
