import {AppModule} from '@/app/app.module';
import {ProjectsModule} from '@/projects/projects.module';
import {WorkspacesModule} from '@/workspaces/workspaces.module';
import {Module} from '@nestjs/common';

@Module({
    imports: [AppModule, ProjectsModule, WorkspacesModule],
    controllers: [],
    providers: []
})
export class MainModule {}
