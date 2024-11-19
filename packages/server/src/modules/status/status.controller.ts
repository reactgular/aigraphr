import { Dictionary } from '@reactgular/aigraphr-domain';
import { Controller, Get } from '@nestjs/common';

import { StatusService } from './status.service';

@Controller()
export class StatusController {
  public constructor(private readonly statusService: StatusService) {}

  @Get()
  public getStatus(): string {
    return this.statusService.getStatus();
  }

  @Get('version')
  public getVersion(): Dictionary<string> {
    return this.statusService.getVersion();
  }
}
