import { notification, Spin } from 'antd';
import { HookRouter, useRedirect, useRoutes } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { AuctionDetails, getAuctions } from '../../utils/api';
import { IPublicState } from '../../utils/keeper';
import { tmpKeeperInit } from '../../utils/tmpSimpleKeeper';
import { Cards } from '../Cards/Cards';
import Create2 from '../Create/Create';
import { Details } from '../Details/Details';
import Page from '../Page/Page';

export const App = () => {
  useRedirect('/', '/waves');
  useRedirect('/waves/', '/waves');
  const [state, setState] = useState<IPublicState>();
  const [auctions, setAuctions] = useState<AuctionDetails[]>();
  useEffect(() => {
    // @FIXME
    tmpKeeperInit()
      .then((state) => {
        setState(state);
      })
      .catch((error) => {
        notification.error({ message: error });
      });
  }, []);

  useEffect(() => {
    if (state === undefined) return;
    // const organizer = state.account!.address;
    const organizer = '3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr';
    getAuctions(organizer).then((auctions) => {
      setAuctions(auctions);
    });
  }, [state]);

  const routes: HookRouter.RouteObject = {
    '/waves': () => <Cards items={auctions || []} />,
    '/waves/create': () => <Create2 />,
    '/waves/bid/:id': ({ id }) => <Details id={id} items={auctions || []} />,
  };

  const routeResult = useRoutes(routes);

  if (state === undefined) return <Spin />;

  return <Page state={state}>{routeResult || '404. Page not found'}</Page>;
};

export default App;
