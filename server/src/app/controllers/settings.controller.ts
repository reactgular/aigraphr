import {SettingsService} from '@/app/services/settings.service';
import {SettingDto} from '@/entities/setting.entity';
import {Response} from '@/scaffold/decorators/response';
import {Controller, Get} from '@nestjs/common';
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
}
