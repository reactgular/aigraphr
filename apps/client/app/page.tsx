import {FC} from 'react';
import {ColorSchemeToggle} from '../src/components/ColorSchemeToggle';
import {FeaturesCards} from '../src/components/FeaturesCards';
import {HeroImageRight} from '../src/components/HeroImageRight';
import {Welcome} from '../src/components/Welcome';

const Index: FC = () => {
    return (
        <>
            <HeroImageRight />
            <FeaturesCards />
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
};

export default Index;
