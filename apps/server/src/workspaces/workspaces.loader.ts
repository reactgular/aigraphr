import * as path from 'path';
import * as fs from 'fs/promises';
import { AIGRAPHR_WORKSPACE } from '../config/aigraphr-folder';
import { WorkspacesSchema } from './workspaces.schema';

export const workspaceLoader = async (wpPath: string): Promise<WorkspacesSchema> => {
  try {
    const filePath = path.join(wpPath, AIGRAPHR_WORKSPACE);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading or parsing workspace.json:', error);
    throw error;
  }
}
