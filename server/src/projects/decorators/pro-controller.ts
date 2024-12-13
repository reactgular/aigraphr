import {applyDecorators, Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

export function ProController(route: string) {
    const decorators: Array<ClassDecorator> = [
        ApiTags('Project'),
        Controller(`project/:projectId/${route}`)
    ];
    return applyDecorators(...decorators);
}
