import React from 'react';
import { Cards } from '../Cards/Cards';
import { MOCK_ITEMS } from '../../mocks';
import { Layout } from 'antd';
import Header from '../Header/Header';

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <Cards items={MOCK_ITEMS} />
      </Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default App;
