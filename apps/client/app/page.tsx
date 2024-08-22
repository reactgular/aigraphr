import {FC} from 'react';
import {Faq} from '../src/components/Faq';
import {Features} from '../src/components/Features';
import {Footer} from '../src/components/Footer';
import {Header} from '../src/components/Header';
import {Hero} from '../src/components/Hero';

const Index: FC = () => {
    return (
        <>
            <Header />
            <Hero />
            <Features />
            <Faq />
            <Footer />
        </>
    );
};

export default Index;
