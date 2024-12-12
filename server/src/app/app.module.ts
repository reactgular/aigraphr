import {SettingsController} from '@/app/controllers/settings.controller';
import {SettingsService} from '@/app/services/settings.service';
import {ProjectEntity} from '@/entities/project.entity';
import {SettingEntity} from '@/entities/setting.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, SettingEntity])],
    controllers: [SettingsController],
    providers: [SettingsService]
})
export class AppModule {}
