import {
    AttributeCreateDto,
    AttributeDto,
    AttributeUpdateDto
} from '@/projects/entities/attribute.entity';
import {AttributesService} from '@/projects/services/attributes.service';
import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Editor')
@Controller('projects/:projectId/attributes')
export class AttributesController {
    public constructor(private readonly attributes: AttributesService) {
        //
    }

    @Get()
    @ApiOperation({summary: `List all attributes`})
    @ScaResponse([AttributeDto])
    public async index(): Promise<Array<AttributeDto>> {
        return await this.attributes.index();
    }

    @Get(':id')
    @ApiOperation({summary: `Get edge by ID`})
    @ScaResponse(AttributeDto)
    public async get(@Param('id') id: number): Promise<AttributeDto> {
        return await this.attributes.get(id);
    }

    @Post()
    @ApiOperation({summary: `Create a new edge`})
    @ScaResponse(AttributeDto)
    public async create(
        @Body() data: AttributeCreateDto
    ): Promise<AttributeDto> {
        return await this.attributes.create(data);
    }

    @Post(':id')
    @ApiOperation({summary: `Update a edge by ID`})
    @ScaResponse(AttributeDto)
    public async update(
        @Param('id') id: number,
        @Body() data: AttributeUpdateDto
    ): Promise<AttributeDto> {
        return await this.attributes.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({summary: `Delete a edge by ID`})
    public async remove(@Param('id') id: number): Promise<void> {
        return await this.attributes.remove(id);
    }
}
