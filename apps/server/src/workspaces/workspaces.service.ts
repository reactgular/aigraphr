import * as prompts from '@clack/prompts';
import { Inject, Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'node:path';
import { AppConfig } from '../config/app.config';
import { WORKSPACE_VERSION, WorkspaceLanguage, WorkspacesSchema } from './workspaces.schema';
import { AIGRAPHR_FOLDER, AIGRAPHR_WORKSPACE } from './workspaces.tokens';

type Option<TValue> = {
  value: TValue;
  label?: string;
  hint?: string;
};

/**
 * @todo - replace cwd with injectable
 */
@Injectable()
export class WorkspacesService {
  private readonly workspacePath: string;

  public constructor(
    @Inject(AIGRAPHR_FOLDER) aigraphrFolder: string,
    @Inject(AIGRAPHR_WORKSPACE) workspaceFile: string
  ) {
    this.workspacePath = path.resolve(aigraphrFolder, workspaceFile);
  }

  public static async load(): Promise<Partial<AppConfig>> {
    return {
      workspace: null
    };
  }

  public async initialize() {
    return await this.exists()
      ? await this.createOrUpdate(await this.load())
      : await this.createOrUpdate();
  }

  private async createOrUpdate(workspace?: WorkspacesSchema) {
    const newWorkspace = await this.prompts(workspace);
    if (newWorkspace) {
      await this.save(newWorkspace);
      return true;
    }
    return false;
  };

  private async exists() {
    try {
      await fs.access(this.workspacePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async load(): Promise<WorkspacesSchema> {
    try {
      const fileContent = await fs.readFile(this.workspacePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading or parsing ${this.workspacePath}:`, error);
      throw error;
    }
  }

  private async prompts(workspace: WorkspacesSchema): Promise<WorkspacesSchema | null> {
    const values = await prompts.group({
      intro: () => prompts.intro('Welcome to the workspace setup!'),
      name: () => prompts.text({
        message: 'Workspace name?',
        placeholder: 'workspace',
        validate(value) {
          if (value.length === 0) return `Workspace name is required!`;
        },
        initialValue: workspace?.name ?? 'workspace'
      }),
      langType: () => prompts.select<Option<WorkspaceLanguage>[], WorkspaceLanguage>({
        message: 'Pick a project type.',
        options: [
          { value: WorkspaceLanguage.TYPESCRIPT, label: 'TypeScript' },
          { value: WorkspaceLanguage.PYTHON, label: 'Python' }
        ],
        initialValue: workspace?.langType ?? WorkspaceLanguage.TYPESCRIPT
      }),
      plugins: () => prompts.multiselect({
        message: 'Select plugins.',
        options: [
          { value: 'OpenAI', label: 'OpenAI', hint: 'recommended' },
          { value: 'Google', label: 'Google Cloud AI' },
          { value: 'AzureAI', label: 'Microsoft Azure AI' }
        ],
        required: false,
        initialValues: workspace?.plugins ?? []
      }),
      confirm: () => prompts.confirm({
        message: 'Is this OK?'
      })
    }, {
      onCancel: (opts) => {
        prompts.cancel('Cancelled');
      }
    });

    if(prompts.isCancel(values)) {
      return null;
    }

    return {
      name: values.name,
      langType: values.langType,
      plugins: values.plugins,
      version: WORKSPACE_VERSION
    }
  }

  private async save(workspace: WorkspacesSchema) {
    try {
      await fs.writeFile(this.workspacePath, JSON.stringify(workspace, null, 2));
    } catch (error) {
      console.error(`Error writing ${this.workspacePath}:`, error);
      throw error;
    }
  }
}
