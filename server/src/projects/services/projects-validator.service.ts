import {
    ProjectCreateDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {ScaInvalidator} from '@/scaffold/validators/sca-invalidator';
import {ScaValidatorService} from '@/scaffold/validators/sca-validator.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ProjectsValidatorService extends ScaValidatorService<
    ProjectEntity,
    ProjectCreateDto,
    ProjectUpdateDto
> {
    public constructor(private readonly projects: ProjectsService) {
        super(ProjectEntity);
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

        if (await this.projects.existsByFileName(data.fileName)) {
            invalidator.notUnique(
                'fileName',
                'Project with the same file name already exists'
            );
        }

        if (data.fileName.length < 3) {
            // @TODO can't this be handled by the validator pipe?
            invalidator.invalid(
                'fileName',
                'Name must be at least 3 characters long'
            );
        }

        // @TODO can't this be handled by the validator pipe?
        if (data.name.length < 3) {
            invalidator.invalid(
                'fileName',
                'Name must be at least 3 characters long'
            );
        }

        if (data.encrypted) {
            invalidator.invalid('encrypted', 'Encryption is not supported yet');
        }
    }

    public async onUpdateValidate(
        invalidator: ScaInvalidator<ProjectUpdateDto>,
        id: number,
        data: ProjectUpdateDto
    ): Promise<void> {
        if (typeof data.open === 'boolean' && Object.keys(data).length > 1) {
            invalidator.invalid(
                'open',
                'Cannot update open status with other fields'
            );
        }

        if (data.fileName) {
            if (data.fileName === (await this.projects.getFileName(id))) {
                invalidator.badValue(
                    'fileName',
                    'File name must be different from the current file name'
                );
            }

            if (data.fileName.length < 3) {
                // @TODO can't this be handled by the validator pipe?
                invalidator.invalid(
                    'fileName',
                    'File name must be at least 3 characters long'
                );
            }

            if (await this.projects.existsByFileName(data.fileName, id)) {
                invalidator.notUnique(
                    'fileName',
                    'Project with the same file name already exists'
                );
            }
        }

        if (data.name) {
            // @TODO can't this be handled by the validator pipe?
            if (data.name.length < 3) {
                invalidator.invalid(
                    'fileName',
                    'Name must be at least 3 characters long'
                );
            }
        }
    }
}
