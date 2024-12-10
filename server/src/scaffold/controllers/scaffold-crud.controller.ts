import {ProjectsIndexDto} from '@/projects/dtos/projects-index.dto';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {
    ScaffoldCrudService,
    ScaffoldEntity
} from '@/scaffold/services/scaffold-crud.service';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Get, Query, Type} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from '@nestjs/swagger';

function toHuman<Entity extends ScaffoldEntity>(entity: Type<Entity>) {
    return entity.name.replace(/Entity$/, '');
}

export function createCrudController<Entity extends ScaffoldEntity>(
    entity: Type<Entity>
) {
    class ScaffoldCrudController {
        public constructor(
            public readonly scaffold: ScaffoldCrudService<Entity>
        ) {
            //
        }

        @Get()
        @ApiOperation({
            summary: `List all ${toHuman(entity)}`
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
    }

    return ScaffoldCrudController;
}
