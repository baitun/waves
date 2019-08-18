import { notification } from 'antd';
import { HookRouter, useRedirect, useRoutes } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { AuctionDetails, getAuctions } from '../../utils/api';
import { IPublicState } from '../../utils/keeper';
import { tmpKeeperInit } from '../../utils/tmpSimpleKeeper';
import { Cards } from '../Cards/Cards';
import CreateAuction from '../Create/CreateAuction';
import CreateLot from '../Create/CreateLot';
import { Details } from '../Details/Details';
import Page from '../Page/Page';

export const App = () => {
  useRedirect('/', '/waves/');
  const [state, setState] = useState<IPublicState>();
  const [auctions, setAuctions] = useState<AuctionDetails[]>();
  useEffect(() => {
    // @FIXME
    tmpKeeperInit()
      .then((state) => {
        setState(state);
      })
      .catch((error) => {
        notification.error({
          message: error,
          description:
            'You need to install and configure Waves Keeper chrome extension in order to use this site!',
        });
      });
  }, []);

  useEffect(() => {
    // const organizer = state.account!.address;
    const organizer = '3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr';
    getAuctions(organizer).then((auctions) => {
      setAuctions(auctions);
    });
  }, []);

  const routes: HookRouter.RouteObject = {
    '/waves/': () => <Cards items={auctions || []} />,
    '/waves/auctions': () => <Cards items={auctions || []} />,
    '/waves/create/lot': () => <CreateLot />,
    '/waves/create/auction': () => <CreateAuction />,
    '/waves/bid/:id': ({ id }) => <Details id={id} items={auctions || []} />,
  };

  const routeResult = useRoutes(routes);

  return <Page state={state}>{routeResult || '404. Page not found'}</Page>;
};

export default App;
