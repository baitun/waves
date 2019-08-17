// https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr_organizer.*
// https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=TAyRZ8XwQ5HYTkZUrTkMFb4oG43UMkCmB3wT5zdj6nL_.*

type ResponseItem = {
  type: string;
  value: string;
  key: string;
};

export type AuctionDetails = {
  id: string;

  lot_amount?: string;

  /** base58 адрес устроителя аукциона */
  organizer?: string;
  /** base58 идентификатор (адрес) NFT токена для продажи */
  lot_assetId?: string;
  // lot_asset_id?: string;
  /** base58 идентификатор (адрес) NFT токена для продажи */
  priceAssetId?: string;
  // price_asset_id?: string;
  /** начальная (минимальная) цена лота */
  startPrice?: string;
  // start_price?: string;
  /** наивысшая раскрытая цена */
  top_price?: string;
  /** вторая раскрытая цена */
  second_price?: string;
  /** base58 адрес победителя аукциона */
  winner?: string;
  /** номер блока (выста) с которой начинается фаза раскрытия */
  reveal_start?: string;
  /** номер блока (выста) с которой начинается фаза окончения */
  closing_start?: string;
  /** размер депозита (максимальной ставки) для участия в аукционе */
  deposit?: string;
  /** количество не раскрывшихся участников */
  unrevealed_count?: string;
  /** признак что аукцион завершился (деньги перечислены организатору, а лот участнику) */
  settle?: boolean;
};

function fetchWrapper(url: string): Promise<ResponseItem[]> {
  return fetch(url).then((response) => response.json());
}

export function getUrl(matches: string): string {
  const ENDPOINT = `https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=`;
  return ENDPOINT + matches;
}

export async function getAuctionIds(organizer = '.*'): Promise<string[]> {
  const res = await fetchWrapper(getUrl(organizer + '_organizer'));
  let auctionIds: string[] = [];
  for (let i = 0; i < res.length; i++) {
    auctionIds.push(...res[i].value.trim().split(' '));
  }
  return auctionIds;
}

export async function getAuctionDetails(auctionId: string) {
  const res = await fetchWrapper(getUrl(auctionId + '_.*'));
  let auctionDetails: AuctionDetails = {
    id: res[0].key.split('_')[0],
  };
  for (let i = 0; i < res.length; i++) {
    const key = res[i].key.substr(res[i].key.indexOf('_') + 1);
    const val = res[i].value;
    auctionDetails[key] = val;
  }
  return auctionDetails;
}

export async function getAuctions(organizer?: string) {
  const auctionIds = await getAuctionIds(organizer);
  const promises = auctionIds.map((id) => getAuctionDetails(id));
  const auctions = await Promise.all(promises);
  return auctions;
}
