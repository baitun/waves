import React from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';

const Page: React.FC = ({ children }) => {
  return (
    <Layout className="layout">
      <Header />
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default Page;
