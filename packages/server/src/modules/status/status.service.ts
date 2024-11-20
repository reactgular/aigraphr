import { ConfigService } from '@/modules/config/config.service';
import { Injectable, Logger } from '@nestjs/common';
import { Dictionary } from '@reactgular/aigraphr-domain';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class StatusService {
  private logger = new Logger(StatusService.name);
  private version: Dictionary<string>;

  public constructor(private readonly configService: ConfigService) {
    this.version = readFileSync(
      join(configService.rootDir, '..', '..', 'VERSION')
    )
      .toString()
      .split(/[\r\n]+/)
      .reduce((agg, line) => {
        const [key, value] = line.split('=');

        // The client is served from another Docker image
        // thus, this one isn't necessarily correct
        if (key !== 'CLIENT_VERSION') {
          agg[key] = value;
        }
        return agg;
      }, {} as Dictionary<string>);
  }

  public getStatus(): string {
    this.logger.log('log from statusService.getStatus()');
    return `Hello world from Nest running on ${this.configService.host}:${this.configService.port}!`;
  }

  public getVersion(): Dictionary<string> {
    return this.version;
  }
}
