import {ProjectsModule} from '@/projects/projects.module';
import {Module} from '@nestjs/common';

@Module({
    imports: [ProjectsModule],
    controllers: [],
    providers: []
})
export class WorkspacesModule {}
