import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectsStorage} from '@/projects/storages/projects-storage';
import {
    Inject,
    Injectable,
    Logger,
    OnApplicationShutdown
} from '@nestjs/common';
import {GoneException} from '@nestjs/common/exceptions/gone.exception';
import {DataSource} from 'typeorm'; // TODO: This could pool data sources in memory.

@Injectable()
export class ProjectDataSourcesService implements OnApplicationShutdown {
    private readonly connections: Record<string, DataSource> = {};

    private readonly log = new Logger('ProjectDataSourcesService');

    public constructor(
        @Inject(PROJECTS_STORAGE)
        private readonly projectsStorage: ProjectsStorage
    ) {}

    public async close(name: string) {
        this.log.log(`Closing data source: ${name}`);

        const dataSource: DataSource | undefined = this.connections[name];
        if (!dataSource) {
            return;
        }

        try {
            await dataSource.destroy();
        } finally {
            delete this.connections[name];
        }
    }

    public async closeAll() {
        for (const name of Object.keys(this.connections)) {
            await this.close(name);
        }
    }

    public isOpen(name: string): boolean {
        return !!this.connections[name];
    }

    public async onApplicationShutdown() {
        return await this.closeAll();
    }

    public async open(
        name: string,
        strict: boolean = true
    ): Promise<DataSource> {
        this.log.log(`Opening data source: ${name}`);

        if (this.connections[name]) {
            this.log.debug(`Data source already open: ${name}`);
            return this.connections[name];
        }

        if (strict) {
            const path = await this.projectsStorage.projectDatabase(name);
            const exists = await this.projectsStorage.projectExists(name);

            if (!exists) {
                throw new GoneException(
                    `Project ${name} database does not exist: ${path}`
                );
            }
        }

        const dataSource = new DataSource({
            type: 'sqlite',
            database: await this.projectsStorage.projectDatabase(name),
            entities: [`${__dirname}/../entities/*.entity{.ts,.js}`],
            subscribers: [
                `${__dirname}/../entities/subscribers/*.subscriber{.ts,.js}`
            ],
            // they are run below
            migrationsRun: false,
            migrations: [`${__dirname}/../entities/migrations/*{.ts,.js}`]
        });

        await dataSource.initialize();
        await dataSource.runMigrations();

        this.connections[name] = dataSource;

        return dataSource;
    }
}
