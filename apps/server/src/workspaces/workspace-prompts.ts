import * as prompts from '@clack/prompts';
import { WorkspaceLanguage, WorkspacesSchema } from './workspaces.schema';

type Option<TValue> = {
  value: TValue;
  label?: string;
  hint?: string;
};

export const workspacePrompts = async (workspace?: WorkspacesSchema) => {
  const group = await prompts.group({
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
    }),
    outro: () => prompts.outro('Thank you for setting up the workspace!')
  }, {
    onCancel: (opts) => {
      prompts.cancel('Cancelled');
    }
  });
};
