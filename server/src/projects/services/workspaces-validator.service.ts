import {
    WorkspaceCreateDto,
    WorkspaceEntity,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {WorkspacesService} from '@/projects/services/workspaces.service';
import {ScaInvalidator} from '@/scaffold/validators/sca-invalidator';
import {ScaValidatorService} from '@/scaffold/validators/sca-validator.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class WorkspacesValidatorService extends ScaValidatorService<
    WorkspaceEntity,
    WorkspaceCreateDto,
    WorkspaceUpdateDto
> {
    public constructor(private readonly workspaces: WorkspacesService) {
        super(WorkspaceEntity);
    }

    public async onCreateValidate(
        invalidator: ScaInvalidator<WorkspaceCreateDto>,
        data: WorkspaceCreateDto
    ): Promise<void> {
        if (await this.workspaces.existsByName(data.name)) {
            invalidator.notUnique(
                'name',
                'Workspace with the same name already exists'
            );
        }

        this.validNameLength(data.name, invalidator);
    }

    public async onUpdateValidate(
        invalidator: ScaInvalidator<WorkspaceUpdateDto>,
        id: number,
        data: WorkspaceUpdateDto
    ): Promise<void> {
        if (data.name) {
            if (data.name === (await this.workspaces.getName(id))) {
                invalidator.badValue(
                    'name',
                    'Name must be different from the current name'
                );
            }

            this.validNameLength(data.name, invalidator);

            if (await this.workspaces.existsByName(data.name, id)) {
                invalidator.notUnique(
                    'name',
                    'Workspace with the same name already exists'
                );
            }
        }
    }

    private validNameLength(
        name: string | undefined,
        invalidator: ScaInvalidator<{name: string}>
    ) {
        if (!name) {
            invalidator.required('name', 'Name must be provided');
        } else if (name.length < 3) {
            invalidator.invalid(
                'name',
                'Name must be at least 3 characters long'
            );
        }
    }
}
