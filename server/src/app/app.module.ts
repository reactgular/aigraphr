import {ProjectsController} from '@/app/controllers/projects.controller';
import {SettingsController} from '@/app/controllers/settings.controller';
import {ProjectsService} from '@/app/services/projects.service';
import {SettingsService} from '@/app/services/settings.service';
import {ProjectEntity} from '@/entities/project.entity';
import {SettingEntity} from '@/entities/setting.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, SettingEntity])],
    controllers: [ProjectsController, SettingsController],
    providers: [SettingsService, ProjectsService],
    exports: [ProjectsService]
})
export class AppModule {}
