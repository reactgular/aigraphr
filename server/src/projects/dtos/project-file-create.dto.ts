import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';

export class ProjectFileCreateDto {
    @IsProfileName()
    name: string;
}
