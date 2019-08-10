import { Layout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { navigate } from 'hookrouter';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [key, setKey] = useState('/');
  const handleClick = (param: ClickParam) => {
    setKey(param.key);
    navigate(key);
  };
  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[key]}
        style={{ lineHeight: '64px' }}
        onClick={handleClick}
      >
        <Menu.Item key="/">WAVES BIDS</Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
