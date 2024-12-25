export type ProjectsStorageResult = [true] | [false, Error];

export type ProjectsStorageMode = 'disk' | 'memory';

export interface ProjectsStorage {
    projectCopy(
        sourceName: string,
        destName: string
    ): Promise<ProjectsStorageResult>;

    projectDatabase(name: string): Promise<string>;

    projectExists(name: string): Promise<boolean>;

    projectRemove(name: string): Promise<ProjectsStorageResult>;

    projectRename(
        oldName: string,
        newName: string
    ): Promise<ProjectsStorageResult>;

    rootDatabase(): Promise<string>;

    /**
     * @deprecated will become private when we add support for in memory databases.
     */
    rootFolder(): Promise<string>;
}
