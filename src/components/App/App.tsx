import { notification } from 'antd';
import { HookRouter, useRedirect, useRoutes } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { IAuctionDetails, getAuctions } from '../../utils/api';
import { IPublicState } from '../../utils/keeper';
import { tmpKeeperInit } from '../../utils/tmpSimpleKeeper';
import { CardsAuctions } from '../Cards/CardsAuctions';
import CreateAuction from '../Create/CreateAuction';
import CreateLot from '../Create/CreateLot';
import { AuctionDetails } from '../Details/AuctionDetails';
import Page from '../Page/Page';

export const App = () => {
  useRedirect('/', '/waves/');
  const [state, setState] = useState<IPublicState>();
  const [auctions, setAuctions] = useState<IAuctionDetails[]>();
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
    '/waves/': () => <CardsAuctions auctions={auctions || []} />,
    '/waves/auctions': () => <CardsAuctions auctions={auctions || []} />,
    '/waves/lots': () => <CardsAuctions auctions={auctions || []} />,
    '/waves/bids': () => <CardsAuctions auctions={auctions || []} />,
    '/waves/create/lot': () => <CreateLot />,
    '/waves/create/auction': () => <CreateAuction />,
    '/waves/auction/:id': ({ id }) => (
      <AuctionDetails
        state={state}
        auction={auctions!.find((a) => a.id === id)}
      />
    ),
  };

  const routeResult = useRoutes(routes);

  return <Page state={state}>{routeResult || '404. Page not found'}</Page>;
};

export default App;
