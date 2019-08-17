import { Icon, Layout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { navigate, usePath } from 'hookrouter';
import React from 'react';
import { IPublicState } from '../../utils/keeper';

export type HeaderProps = {
  state?: IPublicState;
};

const Header: React.FC<HeaderProps> = ({ state }) => {
  const path = usePath();
  const handleClick = (param: ClickParam) => {
    navigate(param.key);
  };

  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[path]}
        style={{ lineHeight: '64px' }}
        onClick={handleClick}
      >
        <Menu.Item key="/waves/">WAVES BIDS</Menu.Item>
        <Menu.Item key="/waves/create">New auction</Menu.Item>
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="user" />
              {(state && state.account && state.account.name) ||
                'NOT AUTHORIZED'}
            </span>
          }
          style={{ float: 'right' }}
        >
          <Menu.Item disabled key="adress">
            {state && state.account && state.account.address}
          </Menu.Item>
          <Menu.ItemGroup title="Info">
            <Menu.Item disabled key="balance-available">
              Balance:{' '}
              {state && state.account && state.account.balance.available} WAVES
            </Menu.Item>
            <Menu.Item disabled key="network">
              Network: {state && state.account && state.account.network}
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
