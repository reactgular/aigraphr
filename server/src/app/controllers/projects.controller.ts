import {ProjectDto, ProjectUpdateDto} from '@/entities/project.entity';
import {ScaCreateMixin} from '@/scaffold/mixins/sca-create.mixin';
import {ScaGetMixin} from '@/scaffold/mixins/sca-get.mixin';
import {ScaPaginateMixin} from '@/scaffold/mixins/sca-paginate.mixin';
import {ScaRemoveMixin} from '@/scaffold/mixins/sca-remove.mixin';
import {ScaUpdateMixin} from '@/scaffold/mixins/sca-update.mixin';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProjectsService} from '../services/projects.service';

@ApiTags('Test')
@Controller('projects')
export class ProjectsController extends ScaPaginateMixin(
    ProjectDto,
    ScaGetMixin(
        ProjectDto,
        ScaCreateMixin(
            ProjectDto,
            ProjectUpdateDto,
            ScaUpdateMixin(
                ProjectDto,
                ProjectUpdateDto,
                ScaRemoveMixin(ProjectDto)
            )
        )
    )
) {
    public constructor(private readonly projects: ProjectsService) {
        super();
    }
}
