'use client';

import {FC} from 'react';
import {Faq} from '../src/components/home/Faq';
import {Features} from '../src/components/home/Features';
import {Footer} from '../src/components/home/Footer';
import {Header} from '../src/components/home/Header';
import {Hero} from '../src/components/home/Hero';

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
