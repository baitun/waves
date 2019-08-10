import React from 'react';
import { Layout, Menu } from 'antd';

const Header: React.FC = () => {
  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">WAVES BIDS</Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
