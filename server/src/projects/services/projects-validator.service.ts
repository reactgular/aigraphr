import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {ScaInvalidator} from '@/scaffold/validators/sca-invalidator';
import {ScaValidatorService} from '@/scaffold/validators/sca-validator.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ProjectsValidatorService extends ScaValidatorService<
    ProjectDto,
    ProjectCreateDto,
    ProjectUpdateDto
> {
    public constructor(private readonly projects: ProjectsService) {
        super(ProjectDto);
    }

    public async onCreateValidate(
        invalidator: ScaInvalidator<ProjectCreateDto>,
        data: ProjectCreateDto
    ): Promise<void> {
        if (typeof data.cloneId === 'number') {
            if (!(await this.projects.scaExists(data.cloneId))) {
                invalidator.notFound('cloneId', 'Project does not exist');
            }
        }

        if (await this.projects.existsByName(data.name)) {
            invalidator.notUnique(
                'name',
                'Project with the same name already exists'
            );
        }

        if (data.name.length < 3) {
            invalidator.invalid(
                'name',
                'Name must be at least 3 characters long'
            );
        }
    }

    public async onUpdateValidate(
        invalidator: ScaInvalidator<ProjectUpdateDto>,
        id: number,
        data: ProjectUpdateDto
    ): Promise<void> {
        const project = await this.projects.scaGet(id);

        if (data.name) {
            if (typeof data.open === 'boolean') {
                invalidator.invalid(
                    'name',
                    'Cannot change name and open status at the same time'
                );
            }

            if (data.name === project.name) {
                invalidator.badValue(
                    'name',
                    'Name must be different from the current name'
                );
            }

            if (data.name.length < 3) {
                invalidator.invalid(
                    'name',
                    'Name must be at least 3 characters long'
                );
            } else {
                if (await this.projects.existsByName(data.name, id)) {
                    invalidator.notUnique(
                        'name',
                        'Project with the same name already exists'
                    );
                }
            }
        } else if (!data.name && typeof data.open === 'undefined') {
            invalidator.invalid('name', 'Must provide name or open status');
        }
    }
}
