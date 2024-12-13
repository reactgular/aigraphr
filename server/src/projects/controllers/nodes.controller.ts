import {
    NodeCreateDto,
    NodeDto,
    NodeUpdateDto
} from '@/projects/entities/node.entity';
import {NodesService} from '@/projects/services/nodes.service';
import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Editor')
@Controller('projects/:projectId/nodes')
export class NodesController {
    public constructor(private readonly nodes: NodesService) {
        //
    }

    @Get()
    @ApiOperation({summary: `List all nodes`})
    @ScaResponse([NodeDto])
    public async index(): Promise<Array<NodeDto>> {
        return await this.nodes.index();
    }

    @Get(':id')
    @ApiOperation({summary: `Get node by ID`})
    @ScaResponse(NodeDto)
    public async get(@Param('id') id: number): Promise<NodeDto> {
        return await this.nodes.get(id);
    }

    @Post()
    @ApiOperation({summary: `Create a new node`})
    @ScaResponse(NodeDto)
    public async create(@Body() data: NodeCreateDto): Promise<NodeDto> {
        return await this.nodes.create(data);
    }

    @Post(':id')
    @ApiOperation({summary: `Update a node by ID`})
    @ScaResponse(NodeDto)
    public async update(
        @Param('id') id: number,
        @Body() data: NodeUpdateDto
    ): Promise<NodeDto> {
        return await this.nodes.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({summary: `Delete a node by ID`})
    public async remove(@Param('id') id: number): Promise<void> {
        return await this.nodes.remove(id);
    }
}
