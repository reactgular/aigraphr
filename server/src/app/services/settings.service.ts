import {SettingEntity} from '@/entities/setting.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class SettingsService {
    public constructor(
        @InjectRepository(SettingEntity)
        private readonly settings: Repository<SettingEntity>
    ) {}

    public async get(id: number): Promise<SettingEntity> {
        return await this.settings.findOneByOrFail({id});
    }
}
