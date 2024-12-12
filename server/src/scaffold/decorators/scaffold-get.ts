import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-crud.service';
import {
    applyDecorators,
    Body as CommonBody,
    Get,
    Param as CommonParam,
    Query as CommonQuery,
    Type
} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiParam} from '@nestjs/swagger';

export function ScaffoldGet<TDto extends ScaffoldEntity>(Dto: Type<TDto>) {
    const MethodDecorator = function () {
        const name = Dto.name.replace(/Dto$/, '');
        const decorators = [
            Get(':id'),
            ApiParam({
                type: Number,
                name: 'id'
            }),
            ApiOperation({summary: `Get ${name} by ID`}),
            ApiOkResponse({type: Dto}),
            DtoResponse(Dto)
        ];
        return applyDecorators(...decorators);
    };

    const ParamDecorator = function (): ParameterDecorator {
        return CommonParam(scaffoldValidationPipe(ScaffoldIdDto));
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
        _response: Promise<TDto>;
    };
}

export type ScaffoldGetType<TDto extends ScaffoldEntity> = {
    Param: ScaffoldIdDto;
    Query: never;
    Body: never;
    Response: Promise<Array<TDto>>;
};
