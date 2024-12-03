import {Demo} from '@/demos/demo.tsx';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Demo />
    </StrictMode>
);
