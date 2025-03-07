import React from 'react';
import Layout from '@theme/Layout';

import Intro from './Intro';
import Features from './Features';
import Frameworks from './Frameworks';

const Home = (): React.JSX.Element => {
    return (
        <Layout>
            <Intro />
            <Features />
            <Frameworks />
        </Layout>
    );
};

export default Home;
