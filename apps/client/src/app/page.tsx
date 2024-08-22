import {FC} from 'react';
import {ColorSchemeToggle} from '../components/ColorSchemeToggle/ColorSchemeToggle';
import {Welcome} from '../components/Welcome/Welcome';

const Index: FC = () => {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
};

export default Index;
