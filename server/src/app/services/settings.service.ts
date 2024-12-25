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

    public async get(): Promise<SettingEntity> {
        return await this.settings.findOneByOrFail({id: 1});
    }

    public async update(data: Partial<SettingEntity>): Promise<SettingEntity> {
        await this.settings.update(1, data);
        return await this.get();
    }
}
