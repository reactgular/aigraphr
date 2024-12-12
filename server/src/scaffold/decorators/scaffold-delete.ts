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
    const MethodDecorator = function () {
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
        _response: Promise<Array<TDto>>;
    };
}

export type ScaffoldDeleteType = {
    Param: ScaffoldIdDto;
    Query: never;
    Body: never;
    Response: Promise<void>;
};
