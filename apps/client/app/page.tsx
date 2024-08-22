import {FC} from 'react';
import {ColorSchemeToggle} from '../src/components/ColorSchemeToggle/ColorSchemeToggle';
import {Welcome} from '../src/components/Welcome/Welcome';

const Index: FC = () => {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
};

export default Index;
