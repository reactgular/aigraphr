import {ScaffoldResponse} from '@/scaffold/decorators/scaffold-response';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';
import {
    applyDecorators,
    Body as CommonBody,
    Get,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from '@nestjs/swagger';

export function ScaffoldIndex<TDto extends ScaffoldEntity>(GetDto: Type<TDto>) {
    const Method = function () {
        const name = GetDto.name.replace(/Dto$/, '');
        const decorators = [
            Get(),
            ApiOperation({summary: `List all ${name}`}),
            ApiOkResponse({type: [GetDto]}),
            ScaffoldResponse([GetDto])
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
        return CommonBody();
    };

    return {Method, Param, Query, Body};
}

export type ScaffoldIndexType<TDto extends ScaffoldEntity> = {
    Param: never;
    Query: never;
    Body: never;
    Response: Promise<Array<TDto>>;
};
