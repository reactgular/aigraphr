import {EdgeEntity} from '@/projects/entities/edge.entity';
import {EDGES_REPOSITORY} from '@/projects/project.symbols';
import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class EdgesService {
    public constructor(
        @Inject(EDGES_REPOSITORY)
        private readonly edges: Repository<EdgeEntity>
    ) {}
}
