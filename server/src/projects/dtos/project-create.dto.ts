import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';

export class ProjectCreateDto {
    @IsProfileName()
    name: string;
}
