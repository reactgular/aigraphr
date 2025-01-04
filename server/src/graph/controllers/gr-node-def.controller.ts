import {GrNodeDefGroupDto} from '@/graph/dtos/gr-node-def-group.dto';
import {GrNodeDefsService} from '@/graph/services/gr-node-defs.service';
import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {Controller, Get} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Graph')
@Controller('node-def')
export class GrNodeDefController {
    public constructor(private readonly grNodeDefs: GrNodeDefsService) {}

    @Get('groups')
    @ApiOperation({summary: `Get a list of node definitions by groups`})
    @ApiOkResponse({
        description: `Return a list of node definitions by groups`,
        type: GrNodeDefGroupDto,
        isArray: true
    })
    @ScaValidateResponse([GrNodeDefGroupDto])
    public async getNodeDefGroups() {
        return this.grNodeDefs.getGroups();
    }
}
