import {GrEditorContext} from '@/components/graph/context/GrEditorContext';
import type {GrEditorModel} from '@/components/graph/context/GrEditorModel';
import {useContext} from 'react';

export const useGrEditor = (): GrEditorModel => {
    const model = useContext(GrEditorContext);
    if (model === null) {
        throw new Error('GrEditorContext is not provided');
    }
    return model;
};
