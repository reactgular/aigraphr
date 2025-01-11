import type {GrEditorModel} from '@/components/graph/editor/GrEditorModel';
import {createContext} from 'react';

const GrEditorContext = createContext<GrEditorModel | null>(null);
GrEditorContext.displayName = 'GrEditorContext';

export {GrEditorContext};
