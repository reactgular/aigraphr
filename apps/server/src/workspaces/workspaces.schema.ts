import Joi from 'joi';

export const WORKSPACE_VERSION = '0.0.1';

export enum WorkspaceLanguage {
  TYPESCRIPT = 'typescript',
  PYTHON = 'python'
}

export interface WorkspacesSchema {
  langType: WorkspaceLanguage;

  name: string;

  plugins: Array<string>;

  version: string;
}

export const WORKSPACE_SCHEMA: Joi.ObjectSchema<WorkspacesSchema> = Joi.object({
  langType: Joi.string().valid(WorkspaceLanguage.TYPESCRIPT, WorkspaceLanguage.PYTHON).required(),
  name: Joi.string().required(),
  plugins: Joi.array().items(Joi.string()).required(),
  version: Joi.string().valid(WORKSPACE_VERSION).required()
});

[480, 150, 90].reduce((acc, i) => {
  return acc + i;
}, 0);

export const validateWorkspace = (workspace: WorkspacesSchema) => {
  return WORKSPACE_SCHEMA.validate(workspace);
}
