import {SettingsService} from '@/app/services/settings.service';
import {SettingDto} from '@/entities/setting.entity';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {Controller, Get, Put} from '@nestjs/common';
import {Patch} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('App')
@Controller('app/settings')
export class SettingsController {
    public constructor(private readonly settings: SettingsService) {
        //
    }

    @Get()
    @ApiOperation({summary: `Get App settings`})
    @ScaResponse(SettingDto)
    public async get(): Promise<SettingDto> {
        return await this.settings.get();
    }

    @Put()
    @ApiOperation({summary: `Replace App settings`})
    @ScaResponse(SettingDto)
    public async replace(
        @ScaBody(SettingDto) data: SettingDto
    ): Promise<SettingDto> {
        return await this.settings.update(data);
    }

    @Patch()
    @ApiOperation({summary: `Update App settings`})
    @ScaResponse(SettingDto)
    public async update(
        @ScaBody(SettingDto) data: SettingDto
    ): Promise<SettingDto> {
        return await this.settings.update(data);
    }
}