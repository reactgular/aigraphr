import {
    EdgeCreateDto,
    EdgeDto,
    EdgeUpdateDto
} from '@/projects/entities/edge.entity';
import {NodeDto} from '@/projects/entities/node.entity';
import {EdgesService} from '@/projects/services/edges.service';
import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Editor')
@Controller('projects/:projectId/edges')
export class EdgesController {
    public constructor(private readonly edges: EdgesService) {
        //
    }

    @Get()
    @ApiOperation({summary: `List all edges`})
    @ScaResponse([EdgeDto])
    public async index(): Promise<Array<EdgeDto>> {
        return await this.edges.index();
    }

    @Get(':id')
    @ApiOperation({summary: `Get edge by ID`})
    @ScaResponse(EdgeDto)
    public async get(@Param('id') id: number): Promise<EdgeDto> {
        return await this.edges.get(id);
    }

    @Post()
    @ApiOperation({summary: `Create a new edge`})
    @ScaResponse(EdgeDto)
    public async create(@Body() data: EdgeCreateDto): Promise<EdgeDto> {
        return await this.edges.create(data);
    }

    @Post(':id')
    @ApiOperation({summary: `Update a edge by ID`})
    @ScaResponse(EdgeDto)
    public async update(
        @Param('id') id: number,
        @Body() data: EdgeUpdateDto
    ): Promise<NodeDto> {
        return await this.edges.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({summary: `Delete a edge by ID`})
    public async remove(@Param('id') id: number): Promise<void> {
        return await this.edges.remove(id);
    }
}
