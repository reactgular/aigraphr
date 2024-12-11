import {ProjectsIndexDto} from '@/projects/dtos/projects-index.dto';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {
    ScaffoldCrudService,
    ScaffoldEntity
} from '@/scaffold/services/scaffold-crud.service';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {Delete, Get, Param, Post, Query, Type} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

export function createCrudController<Entity extends ScaffoldEntity>(
    entity: Type<Entity>
) {
    const name = toHumanUtils(entity);

    class ScaffoldCrudController {
        public constructor(
            public readonly scaffold: ScaffoldCrudService<Entity>
        ) {
            //
        }

        @Get()
        @ApiOperation({
            summary: `List all ${name}`
        })
        @DtoResponse([entity])
        @ApiOkResponse({
            type: [entity]
        })
        public async index(
            @Query() {sort, sortBy}: ProjectsIndexDto
        ): Promise<Array<Entity>> {
            const storages = await this.scaffold.findAll();
            return scaffoldSort(storages, sortBy, sort);
        }

        // @TODO fix null
        @Get(':id')
        @ApiOperation({summary: `Get ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        @DtoResponse(entity)
        public async get(@Param('id') id: string): Promise<Entity | null> {
            return await this.scaffold.findOne(id);
        }

        // @TODO fix null
        @Post()
        @ApiOperation({summary: `Create a new ${name}.`})
        @DtoResponse(entity)
        public async create(): Promise<Entity | null> {
            return null;
        }

        @Delete(':id')
        @ApiOperation({summary: `Delete ${name} by ID`})
        @ApiNotFoundResponse({description: `${name} not found`})
        public async remove(@Param('id') id: string): Promise<void> {
            await this.scaffold.remove(id);
        }
    }

    return ScaffoldCrudController;
}
