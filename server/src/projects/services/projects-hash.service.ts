import {PROJECT_STORAGE_NONCE} from '@/projects/_deprecated/project-old-files.service';
import {Inject, Injectable} from '@nestjs/common';
import crypto from 'crypto';

/**
 * @todo move to a utils module or something
 */
@Injectable()
export class ProjectsHashService {
    public constructor(
        @Inject(PROJECT_STORAGE_NONCE) private readonly nonce: string
    ) {}

    public hash(str: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(this.nonce + str, 'utf8');
        return hash.digest('hex');
    }
}
