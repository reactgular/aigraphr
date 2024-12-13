import {SettingsController} from '@/app/controllers/settings.controller';
import {SettingsService} from '@/app/services/settings.service';
import {SettingEntity} from '@/entities/setting.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([SettingEntity])],
    controllers: [SettingsController],
    providers: [SettingsService],
    exports: []
})
export class AppModule {}
