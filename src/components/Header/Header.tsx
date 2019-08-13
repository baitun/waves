import { Icon, Layout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { navigate } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { tmpKeeperInit } from '../../utils/tmpSimpleKeeper';
import style from './Header.module.css';
import { IPublicState } from '../../utils/keeper';

const Header: React.FC = () => {
  const [key, setKey] = useState('/');
  const [state, setState] = useState<IPublicState>();
  const handleClick = (param: ClickParam) => {
    setKey(param.key);
    navigate(key);
  };

  useEffect(() => {
    // @FIXME
    tmpKeeperInit().then((state) => {
      setState(state);
    });
  }, []);

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
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="user" />
              Name
            </span>
          }
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
      <div className={style.user}>
        {state && state.account && state.account.address}
      </div>
    </Layout.Header>
  );
};

export default Header;
