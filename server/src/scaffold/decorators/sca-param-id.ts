import {Param, ParseIntPipe} from '@nestjs/common';

export function ScaParamId(paramId: string = 'id') {
    return Param(paramId, ParseIntPipe);
}
