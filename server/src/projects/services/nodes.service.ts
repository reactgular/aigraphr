import {NodeEntity} from '@/projects/entities/node.entity';
import {NODES_REPOSITORY} from '@/projects/project-symbols';
import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class NodesService {
    public constructor(
        @Inject(NODES_REPOSITORY)
        private readonly nodes: Repository<NodeEntity>
    ) {}
}
