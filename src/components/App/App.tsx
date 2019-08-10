import { HookRouter, useRoutes } from 'hookrouter';
import React from 'react';
import { MOCK_ITEMS } from '../../mocks';
import { Cards } from '../Cards/Cards';
import Page from '../Page/Page';

const routes: HookRouter.RouteObject = {
  '/': () => (
    <Page>
      <Cards items={MOCK_ITEMS} />
    </Page>
  ),
  '/new': () => <Page>Create</Page>,
  '/bid/:id': ({ id }) => <Page>{id}</Page>,
};

export const App = () => {
  const routeResult = useRoutes(routes);

  return routeResult || <>404. Page not found</>;
};

export default App;
