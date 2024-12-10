import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Workspaces')
@Controller('projects/:projectId/workspaces')
export class WorkspacesController {
    @Get()
    @ApiOperation({})
    findAll() {
        return 'This action returns all workspaces';
    }
}
