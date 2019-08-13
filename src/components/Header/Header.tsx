import { Icon, Layout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { navigate } from 'hookrouter';
import React, { useState } from 'react';
import { IPublicState } from '../../utils/keeper';

export type HeaderProps = {
  state: IPublicState;
};

const Header: React.FC<HeaderProps> = ({ state }) => {
  const [key, setKey] = useState('/waves');
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
        <Menu.Item key="/waves">WAVES BIDS</Menu.Item>
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="user" />
              {(state && state.account && state.account.address) ||
                'NOT AUTHORIZED'}
            </span>
          }
          style={{ float: 'right' }}
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
