import { Layout } from 'antd';
import React from 'react';
import Header, { HeaderProps } from '../Header/Header';

type PageProps = HeaderProps;

const Page: React.FC<PageProps> = ({ children, state }) => {
  return (
    <Layout className="layout">
      <Header state={state} />
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
};

export default Page;
