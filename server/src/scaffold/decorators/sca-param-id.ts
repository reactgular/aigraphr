import {Param, ParseIntPipe} from '@nestjs/common';

export function ScaParamId() {
    return Param('id', ParseIntPipe);
}
