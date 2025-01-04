import {GrGroupDto} from '@/graph/dtos/gr-group.dto';
import {GrNodesService} from '@/graph/services/gr-nodes.service';
import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {Controller, Get} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Graph')
@Controller('graph')
export class GraphController {
    public constructor(private readonly grNodes: GrNodesService) {}

    @Get('groups')
    @ApiOperation({summary: `Get a list of node definitions`})
    @ApiOkResponse({
        description: `Return a list of node definitions`,
        type: GrGroupDto,
        isArray: true
    })
    @ScaValidateResponse([GrGroupDto])
    public async getGroups() {}
}
