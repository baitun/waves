import { Spin } from 'antd';
import { HookRouter, useRoutes } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { MOCK_ITEMS } from '../../mocks';
import { IPublicState } from '../../utils/keeper';
import { tmpKeeperInit } from '../../utils/tmpSimpleKeeper';
import { Cards } from '../Cards/Cards';
import Create2 from '../Create/Create';
import { Details } from '../Details/Details';
import Page from '../Page/Page';

export const App = () => {
  const [state, setState] = useState<IPublicState>();
  useEffect(() => {
    // @FIXME
    tmpKeeperInit().then((state) => {
      setState(state);
    });
  }, []);

  const routes: HookRouter.RouteObject = {
    '/': () => <Cards items={MOCK_ITEMS} />,
    '/create': () => <Create2 />,
    '/bid/:id': ({ id }) => <Details uuid={id} />,
  };

  const routeResult = useRoutes(routes);

  if (state === undefined) return <Spin />;

  return <Page state={state}>{routeResult || '404. Page not found'}</Page>;
};

export default App;
