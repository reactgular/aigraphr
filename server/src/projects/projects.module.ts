import {AppModule} from '@/app/app.module';
import {ProjectEntity} from '@/entities/project.entity';
import {NodesController} from '@/projects/controllers/nodes.controller';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import {WorkspacesController} from '@/projects/controllers/workspaces.controller';
import {EdgeEntity} from '@/projects/entities/edge.entity';
import {NodeEntity} from '@/projects/entities/node.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {
    EDGES_REPOSITORY,
    NODES_REPOSITORY,
    WORKSPACES_REPOSITORY
} from '@/projects/project-symbols';
import {EdgesService} from '@/projects/services/edges.service';
import {NodesService} from '@/projects/services/nodes.service';
import {ProjectDataSourcesService} from '@/projects/services/project-data-sources.service';
import {ProjectParamService} from '@/projects/services/project-param.service';
import {ProjectReposService} from '@/projects/services/project-repos.service';
import {
    PROJECT_EXTENSION,
    ProjectsStorageService
} from '@/projects/services/projects-storage.service';
import {ProjectsValidatorService} from '@/projects/services/projects-validator.service';
import {ProjectsService} from '@/projects/services/projects.service';
import {WorkspacesService} from '@/projects/services/workspaces.service';
import {UtilsModule} from '@/utils/utils.module';
import {Module, Scope} from '@nestjs/common';
import {InjectionToken} from '@nestjs/common/interfaces/modules/injection-token.interface';
import {FactoryProvider} from '@nestjs/common/interfaces/modules/provider.interface';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EntityTarget} from 'typeorm/common/EntityTarget';
import {ObjectLiteral} from 'typeorm/common/ObjectLiteral';
import {EdgesController} from './controllers/edges.controller';
import {ProjectGuard} from './gaurds/project.guard';

function repository<Entity extends ObjectLiteral>(
    provide: InjectionToken,
    target: EntityTarget<Entity>
): FactoryProvider {
    return {
        scope: Scope.REQUEST,
        provide,
        useFactory: (databases: ProjectReposService) =>
            databases.repository(target),
        inject: [ProjectReposService]
    } satisfies FactoryProvider;
}

@Module({
    imports: [
        AppModule,
        TypeOrmModule.forFeature([ProjectEntity]),
        UtilsModule
    ],
    controllers: [
        ProjectsController,
        EdgesController,
        NodesController,
        WorkspacesController
    ],
    providers: [
        ProjectGuard,
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectsStorageService,
        ProjectReposService,
        ProjectDataSourcesService,
        ProjectParamService,
        repository(WORKSPACES_REPOSITORY, WorkspaceEntity),
        repository(NODES_REPOSITORY, NodeEntity),
        repository(EDGES_REPOSITORY, EdgeEntity),
        ProjectsService,
        ProjectsValidatorService,
        EdgesService,
        NodesService,
        WorkspacesService
    ],
    exports: [
        ProjectsService,
        ProjectsValidatorService,
        ProjectGuard,
        ProjectsStorageService,
        ProjectReposService,
        ProjectParamService,
        WORKSPACES_REPOSITORY
    ]
})
export class ProjectsModule {}
