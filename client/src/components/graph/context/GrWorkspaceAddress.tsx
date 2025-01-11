import type {WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {createContext} from 'react';

const GrWorkspaceAddress = createContext<WorkspaceAddress | null>(null);
GrWorkspaceAddress.displayName = 'GrWorkspaceAddress';

export {GrWorkspaceAddress};
