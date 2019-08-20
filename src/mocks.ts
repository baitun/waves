import { ILotDetails, IBidDetails, IAuctionDetails } from './utils/api';

export function getAuctions(adress?: string): IAuctionDetails[] {
  return [
    {
      id: 'TAyRZ8XwQ5HYTkZUrTkMFb4oG43UMkCmB3wT5zdj6nL',
      closing_start: 636270,
      deposit: 200000,
      lot_amount: 1,
      lot_assetId: 'DfevR4SncDEzCcq2Wnsb2ftPJHhQ9G7A55jPa9kse8eB',
      organizer: '3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr',
      priceAssetId: 'WAVES',
      reveal_start: 626190,
      second_price: 0,
      settle: false,
      startPrice: 100000,
      top_price: 0,
      unrevealed_count: 0,
    },
    {
      id: '2BLQ7ZFsBNk6t32dPXtyYXxmYon815sfa1V82Lk2cSQ7',
      closing_start: 636274,
      deposit: 200000,
      lot_amount: 1,
      lot_assetId: 'Z37nfqZnoAziZrRkS1JPuAbSXVegkY6cRAkPNaLVYKd',
      organizer: '3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr',
      priceAssetId: 'WAVES',
      reveal_start: 626194,
      second_price: 0,
      settle: false,
      startPrice: 100000,
      top_price: 0,
      unrevealed_count: 0,
    },
    {
      id: 'dL6PtY2srkaXcoXY5RnZSrDgw7KBqp5iNVnJtwVPBGo',
      closing_start: 639813,
      deposit: 200000,
      lot_amount: 1,
      lot_assetId: '8rwEzFBYzReR3csc5PvpjTdcj5uPddtkuDxB2tUx2wno',
      organizer: '3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr',
      priceAssetId: 'WAVES',
      reveal_start: 629733,
      second_price: 0,
      settle: false,
      startPrice: 100000,
      top_price: 0,
      unrevealed_count: 0,
    },
  ];
}

export function getLots(adress?: string): ILotDetails[] {
  return [
    {
      id: 'Z37nfqZnoAziZrRkS1JPuAbSXVegkY6cRAkPNaLVYKd',
      name: 'Lot number 1',
      imageUrl: 'https://placekitten.com/800/400?image=10',
    },
    {
      id: '8rwEzFBYzReR3csc5PvpjTdcj5uPddtkuDxB2tUx2wno',
      name: 'Lot number 2',
      imageUrl: 'https://placekitten.com/800/400?image=1',
    },
  ];
}

export function getBids(adress?: string): IBidDetails[] {
  return getAuctions().map((auction) => ({
    ...auction,
    auctionId: auction.id,
    hash: 'hashhashhashhashhashhashhashhash',
    priceAssetId: 'WAVES',
    deposit: 1000,
  }));
}
