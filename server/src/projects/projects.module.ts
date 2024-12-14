import {AppModule} from '@/app/app.module';
import {ProjectEntity} from '@/entities/project.entity';
import {NodesController} from '@/projects/controllers/nodes.controller';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import {WorkspacesController} from '@/projects/controllers/workspaces.controller';
import {AttributeEntity} from '@/projects/entities/attribute.entity';
import {EdgeEntity} from '@/projects/entities/edge.entity';
import {NodeEntity} from '@/projects/entities/node.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {
    ATTRIBUTES_REPOSITORY,
    EDGES_REPOSITORY,
    NODES_REPOSITORY,
    WORKSPACES_REPOSITORY
} from '@/projects/project-symbols';
import {AttributesService} from '@/projects/services/attributes.service';
import {EdgesService} from '@/projects/services/edges.service';
import {NodesService} from '@/projects/services/nodes.service';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {ProjectEntityService} from '@/projects/services/project-entity.service';
import {
    PROJECT_EXTENSION,
    ProjectsStorageService
} from '@/projects/services/projects-storage.service';
import {ProjectsService} from '@/projects/services/projects.service';
import {WorkspacesService} from '@/projects/services/workspaces.service';
import {UtilsModule} from '@/utils/utils.module';
import {Module, Scope} from '@nestjs/common';
import {InjectionToken} from '@nestjs/common/interfaces/modules/injection-token.interface';
import {FactoryProvider} from '@nestjs/common/interfaces/modules/provider.interface';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EntityTarget} from 'typeorm/common/EntityTarget';
import {ObjectLiteral} from 'typeorm/common/ObjectLiteral';
import {AttributesController} from './controllers/attributes.controller';
import {EdgesController} from './controllers/edges.controller';
import {ProjectGuard} from './gaurds/project.guard';

function repository<Entity extends ObjectLiteral>(
    provide: InjectionToken,
    target: EntityTarget<Entity>
): FactoryProvider {
    return {
        scope: Scope.REQUEST,
        provide,
        useFactory: (databases: ProjectDatabasesService) =>
            databases.repository(target),
        inject: [ProjectDatabasesService]
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
        AttributesController,
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
        ProjectDatabasesService,
        ProjectEntityService,
        repository(WORKSPACES_REPOSITORY, WorkspaceEntity),
        repository(NODES_REPOSITORY, NodeEntity),
        repository(EDGES_REPOSITORY, EdgeEntity),
        repository(ATTRIBUTES_REPOSITORY, AttributeEntity),
        ProjectsService,
        AttributesService,
        EdgesService,
        NodesService,
        WorkspacesService
    ],
    exports: [
        ProjectsService,
        ProjectGuard,
        ProjectsStorageService,
        ProjectDatabasesService,
        ProjectEntityService,
        WORKSPACES_REPOSITORY
    ]
})
export class ProjectsModule {}
