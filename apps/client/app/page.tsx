import {FC} from 'react';
import {FaqSimple} from '../src/components/FaqSimple';
import {FeaturesCards} from '../src/components/FeaturesCards';
import {HeroImageRight} from '../src/components/HeroImageRight';

const Index: FC = () => {
    return (
        <>
            <HeroImageRight />
            <FeaturesCards />
            <FaqSimple />
        </>
    );
};

export default Index;
