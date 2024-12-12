import {SettingsService} from '@/app/services/settings.service';
import {SettingDto} from '@/entities/setting.entity';
import {Response} from '@/scaffold/decorators/response';
import {Body, Controller, Get, Put} from '@nestjs/common';
import {Patch} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('App')
@Controller('app/settings')
export class SettingsController {
    public constructor(private readonly settings: SettingsService) {
        //
    }

    @Get()
    @ApiOperation({summary: `Get app settings`})
    @Response(SettingDto)
    public async get(): Promise<SettingDto> {
        return await this.settings.get(1);
    }

    @Put()
    @ApiOperation({summary: `Replace app settings`})
    @Response(SettingDto)
    public async create(@Body() data: SettingDto): Promise<SettingDto> {
        return await this.settings.update(1, data);
    }

    @Patch()
    @ApiOperation({summary: `Update app settings`})
    @Response(SettingDto)
    public async update(@Body() data: SettingDto): Promise<SettingDto> {
        return await this.settings.update(1, data);
    }
}
