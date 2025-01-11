import {GrEditorContext} from '@/components/graph/editor/GrEditorContext';
import type {GrEditorModel} from '@/components/graph/editor/GrEditorModel';
import {useContext} from 'react';

export const useGrEditor = (): GrEditorModel => {
    const model = useContext(GrEditorContext);
    if (model === null) {
        throw new Error('GrEditorContext is not provided');
    }
    return model;
};
