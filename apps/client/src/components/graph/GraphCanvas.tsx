import {FC} from 'react';
import styles from './GraphCanvas.module.css';

export const GraphCanvas: FC = () => {
    return (
        <div className={styles.graphCanvasWrapper}>
            <div className={styles.graphCanvas}>CANVAS</div>
        </div>
    );
};
