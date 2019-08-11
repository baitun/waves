import { HookRouter, useRoutes } from 'hookrouter';
import React from 'react';
import { MOCK_ITEMS } from '../../mocks';
import { Cards } from '../Cards/Cards';
import Page from '../Page/Page';
import { Details } from '../Details/Details';
import Create2 from '../Create/Create';

const routes: HookRouter.RouteObject = {
  '/': () => <Cards items={MOCK_ITEMS} />,
  '/create': () => <Create2 />,
  '/bid/:id': ({ id }) => <Details uuid={id} />,
};

export const App = () => {
  const routeResult = useRoutes(routes);

  return <Page>{routeResult || '404. Page not found'}</Page>;
};

export default App;
