import React from 'react';
import Layout from '@theme/Layout';

import Intro from '../components/Intro';
import Features from '../components/Features';
import Frameworks from '../components/Frameworks';

const Home = (): React.JSX.Element => {
    return (
        <Layout>
            <div className="home">
                <Intro />
                <Features />
                <Frameworks />
            </div>
        </Layout>
    );
};

export default Home;
