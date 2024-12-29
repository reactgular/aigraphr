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

    public async close(fileName: string) {
        this.log.log(`Closing data source: ${fileName}`);

        const dataSource: DataSource | undefined = this.connections[fileName];
        if (!dataSource) {
            return;
        }

        try {
            await dataSource.destroy();
        } finally {
            delete this.connections[fileName];
        }
    }

    public async closeAll() {
        for (const fileName of Object.keys(this.connections)) {
            await this.close(fileName);
        }
    }

    public isOpen(fileName: string): boolean {
        return !!this.connections[fileName];
    }

    public async onApplicationShutdown() {
        return await this.closeAll();
    }

    public async open(
        fileName: string,
        strict: boolean = true
    ): Promise<DataSource> {
        this.log.log(`Opening data source: ${fileName}`);

        if (this.connections[fileName]) {
            this.log.debug(`Data source already open: ${fileName}`);
            return this.connections[fileName];
        }

        if (strict) {
            const path = await this.projectsStorage.projectDatabase(fileName);
            const exists = await this.projectsStorage.projectExists(fileName);

            if (!exists) {
                throw new GoneException(
                    `Project ${fileName} database does not exist: ${path}`
                );
            }
        }

        const dataSource = new DataSource({
            type: 'sqlite',
            database: await this.projectsStorage.projectDatabase(fileName),
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

        this.connections[fileName] = dataSource;

        return dataSource;
    }
}
