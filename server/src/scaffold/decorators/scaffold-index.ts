import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-crud.service';
import {
    applyDecorators,
    Body as CommonBody,
    Get,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from '@nestjs/swagger';

export function ScaffoldIndex<TDto extends ScaffoldEntity>(Dto: Type<TDto>) {
    const MethodDecorator = function () {
        const name = Dto.name.replace(/Dto$/, '');
        const decorators = [
            Get(),
            ApiOperation({summary: `List all ${name}`}),
            ApiOkResponse({type: [Dto]}),
            DtoResponse([Dto])
        ];
        return applyDecorators(...decorators);
    };

    const ParamDecorator = function (): ParameterDecorator {
        return CommonParam();
    };

    const QueryDecorator = function (): ParameterDecorator {
        return CommonQuery();
    };

    const BodyDecorator = function (): ParameterDecorator {
        return CommonBody();
    };

    return {
        Method: MethodDecorator,
        Param: ParamDecorator,
        Query: QueryDecorator,
        Body: BodyDecorator
    } as {
        Method: typeof MethodDecorator;
        Param: typeof ParamDecorator;
        _paramType: never;
        Query: typeof QueryDecorator;
        _queryType: never;
        Body: typeof BodyDecorator;
        _bodyType: never;
        _response: Promise<Array<TDto>>;
    };
}

export type ScaffoldIndexType<TDto extends ScaffoldEntity> = {
    Param: never;
    Query: never;
    Body: never;
    Response: Promise<Array<TDto>>;
};
