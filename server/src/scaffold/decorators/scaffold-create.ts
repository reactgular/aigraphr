import {DtoResponse} from '@/scaffold/decorators/dto-response';
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
import {ApiOkResponse, ApiOperation} from '@nestjs/swagger';

export function ScaffoldCreate<
    TCreateDto extends Partial<ScaffoldEntity>,
    TGetDtp extends ScaffoldEntity
>(CreateDto: Type<TCreateDto>, GetDto: Type<TGetDtp>) {
    const MethodDecorator = function () {
        const name = CreateDto.name.replace(/Dto$/, '');
        const decorators = [
            Get(),
            ApiOperation({summary: `Create a new ${name}.`}),
            ApiOkResponse({type: CreateDto}),
            DtoResponse(GetDto)
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
        return CommonBody(scaffoldValidationPipe(CreateDto));
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
        _response: Promise<Array<TCreateDto>>;
    };
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
