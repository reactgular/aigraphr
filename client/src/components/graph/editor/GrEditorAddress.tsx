import type {WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {createContext} from 'react';

const GrEditorAddress = createContext<WorkspaceAddress | null>(null);
GrEditorAddress.displayName = 'GrEditorAddress';

export {GrEditorAddress};
