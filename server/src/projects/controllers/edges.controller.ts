import {
    EdgeCreateDto,
    EdgeDto,
    EdgeUpdateDto
} from '@/projects/entities/edge.entity';
import {NodeDto} from '@/projects/entities/node.entity';
import {EdgesService} from '@/projects/services/edges.service';
import {Response} from '@/scaffold/decorators/response';
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
    @Response([EdgeDto])
    public async index(): Promise<Array<EdgeDto>> {
        return await this.edges.index();
    }

    @Get(':id')
    @ApiOperation({summary: `Get edge by ID`})
    @Response(EdgeDto)
    public async get(@Param('id') id: number): Promise<EdgeDto> {
        return await this.edges.get(id);
    }

    @Post()
    @ApiOperation({summary: `Create a new edge`})
    @Response(EdgeDto)
    public async create(@Body() data: EdgeCreateDto): Promise<EdgeDto> {
        return await this.edges.create(data);
    }

    @Post(':id')
    @ApiOperation({summary: `Update a edge by ID`})
    @Response(EdgeDto)
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
