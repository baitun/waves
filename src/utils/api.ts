// https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr_organizer.*
// https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=TAyRZ8XwQ5HYTkZUrTkMFb4oG43UMkCmB3wT5zdj6nL_.*

type ResponseItem = {
  type: string;
  value: string;
  key: string;
};

export type AuctionDetails = {
  closing_start?: string;
  deposit?: string;
  lot_amount?: string;
  lot_assetId?: string;
  organizer?: string;
  priceAssetId?: string;
  reveal_start?: string;
  second_price?: string;
  settle?: string;
  startPrice?: string;
  top_price?: string;
  unrevealed_count?: string;
};

function fetchWrapper(url: string): Promise<ResponseItem[]> {
  return fetch(url).then((response) => response.json());
}

export function getUrl(matches: string): string {
  const ENDPOINT = `https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=`;
  return ENDPOINT + matches;
}

export async function getAuctionIds(organizer: string): Promise<string[]> {
  const res = await fetchWrapper(getUrl(organizer + '_organizer.*'));
  const auctionIds = res[0].value.trim().split(' ');
  return auctionIds;
}

export async function getAuctionDetails(auctionId: string) {
  const res = await fetchWrapper(getUrl(auctionId + '_.*'));
  let auctionDetails: AuctionDetails = {};
  for (let i = 0; i < res.length; i++) {
    const key = res[i].key.substr(res[i].key.indexOf('_') + 1);
    const val = res[i].value;
    auctionDetails[key] = val;
  }
  return auctionDetails;
}

export async function getAuctions(organizer: string) {
  const auctionIds = await getAuctionIds(organizer);
  const promises = auctionIds.map((id) => getAuctionDetails(id));
  const auctions = await Promise.all(promises);
  return auctions;
}
