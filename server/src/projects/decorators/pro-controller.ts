import {applyDecorators, Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

export function ProController(route: string) {
    const decorators: Array<ClassDecorator> = [
        ApiTags('Projects'),
        Controller(`projects/:projectId/${route}`)
    ];
    return applyDecorators(...decorators);
}
