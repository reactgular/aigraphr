import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { AIGRAPHR_FOLDER } from '../config/aigraphr-folder';
import { findFolder } from '../config/find-folder';

@Injectable()
export class WorkspacesService {
  /**
   * @todo this should go into the ConfigModule
   * @todo if we can't find the folder, user is in wrong folder or didn't run init command. Need to give friendly feedback.
   */
  public static async getAIGraphrFolder() {
    const aigraphr = await findFolder(AIGRAPHR_FOLDER, process.cwd());
    if (!aigraphr) {
      throw new Error(`No ${AIGRAPHR_FOLDER} folder found`);
    }
    return aigraphr;
  }

  public static async getWorkspaceJsonPath() {
    const aigraphr = await WorkspacesService.getAIGraphrFolder();
    return path.resolve(path.join(aigraphr, 'workspace.json'));
  }

  /**
   * @todo parsing the workspace.json should maybe happen afterwards? what if parsing fails? we should show friendly confole feedback.
   */
  public static async load() {
    const aigraphr = await WorkspacesService.getAIGraphrFolder();

    const content = await fs.readFile(path.join(aigraphr, 'workspace.yaml'), 'utf8');

    return yaml.load(
      readFileSync(path.join(aigraphr, 'workspace.yaml'), 'utf8')
    ) as Record<string, any>;
  }
}
