import {FC} from 'react';
import {ColorSchemeToggle} from '../src/components/ColorSchemeToggle/ColorSchemeToggle';
import {FeaturesCards} from '../src/components/FeatureCards/FeaturesCards';
import {HeroImageRight} from '../src/components/HeroImageRight/HeroImageRight';
import {Welcome} from '../src/components/Welcome/Welcome';

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
