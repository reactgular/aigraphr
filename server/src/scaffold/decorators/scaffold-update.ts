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

export function ScaffoldUpdate<
    TUpdateDto extends Partial<ScaffoldEntity>,
    TGetDtp extends ScaffoldEntity
>(PatchDto: Type<TUpdateDto>, GetDto: Type<TGetDtp>) {
    const Method = function () {
        const name = PatchDto.name.replace(/Dto$/, '');
        const decorators = [
            Patch(':id'),
            ApiParam({
                type: Number,
                name: 'id'
            }),
            ApiOperation({summary: `Updates a ${name}.`}),
            ApiBody({type: PatchDto}),
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
        return CommonBody(scaffoldValidationPipe(PatchDto));
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
