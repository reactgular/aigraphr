import {applyDecorators, Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

export function ProController(route: string) {
    const decorators: Array<ClassDecorator> = [
        ApiTags('Editor'),
        Controller(`editor/:projectId/${route}`)
    ];
    return applyDecorators(...decorators);
}
