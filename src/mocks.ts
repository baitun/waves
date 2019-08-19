import { ILotDetails } from './utils/api';

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
