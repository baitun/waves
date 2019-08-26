import { sha256, base64Encode, stringToBytes } from '@waves/ts-lib-crypto';

// https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=3MvxXxJcuELB2UaCHKVQaUszu8u3NmXxoWr_organizer.*
// https://nodes-testnet.wavesnodes.com/addresses/data/3MvoQ3q8wFnquWFPSZuBGunTnE1fphumBxd?matches=TAyRZ8XwQ5HYTkZUrTkMFb4oG43UMkCmB3wT5zdj6nL_.*

export const WAVES = 10 ** 8;

type Phase = 'BID' | 'REVEAL' | 'SETTTLE';

type ResponseItem = {
  type: string;
  value: string;
  key: string;
};

export type IAuctionDetails = {
  id: string;

  phase: Phase;

  lot_amount?: number;

  /** Time left for bids (in blocks) */
  deltaReveal?: number;

  /** Time left for reveal bids (in blocks) */
  deltaSettle?: number;

  /** base58 адрес устроителя аукциона */
  organizer?: string;
  /** base58 идентификатор (адрес) NFT токена для продажи */
  lot_assetId?: string;
  // lot_asset_id?: string;
  /** base58 идентификатор (адрес) NFT токена для продажи */
  priceAssetId?: string;
  // price_asset_id?: string;
  /** начальная (минимальная) цена лота */
  startPrice?: number;
  // start_price?: string;
  /** наивысшая раскрытая цена */
  top_price?: number;
  /** вторая раскрытая цена */
  second_price?: number;
  /** base58 адрес победителя аукциона */
  winner?: string;
  /** номер блока (выста) с которой начинается фаза раскрытия */
  reveal_start?: number;
  /** номер блока (выста) с которой начинается фаза окончения */
  closing_start?: number;
  /** размер депозита (максимальной ставки) для участия в аукционе */
  deposit?: number;
  /** количество не раскрывшихся участников */
  unrevealed_count?: number;
  /** признак что аукцион завершился (деньги перечислены организатору, а лот участнику) */
  settle?: boolean;
};

export type ILot = {
  name: string; // Token name
  imageUrl: string; // URL Preview на аукцион
};

export type ILotDetails = ILot & { id: string };

export type Auction = {
  assetId: string;
  duration: number;
  startPrice: number;
  priceAssetId?: string;
  deposit: number;
};

export type BidWithAuction = Bid & IAuctionDetails;

export type Bid = {
  auctionId: string;
  hash: string;
  /** валюта аукциона (base58 адрес токена валюты или строка 'WAVES') */
  priceAssetId?: string;
  /** размер депозита участника (максимальная цена) по аукциону */
  deposit: number;
};

export type IBidDetails = Bid & IAuctionDetails;

export type HashedBid = {
  amount: string;
  salt: string;
  hashedAmount: string;
};

export type Reveal = {
  auctionId: string;
  salt: string;
  amount: number;
};

export type TxResponse = {
  id: string;
  sender: string;
  senderPublicKey: string;
  timestamp: number;
};

export type Error = {
  error: string;
  message: string;
};

export type NFT = {
  description: string;
  id: string;
  name: string;
};

export type SignatureCallback = (txData: any) => Promise<any>;

function fetchWrapper(url: string): Promise<ResponseItem[]> {
  return fetch(url).then((response) => response.json());
}

function generalFetchWrapper(url: string): Promise<any> {
  return fetch(url).then((response) => response.json());
}

const CONTRACT_ADDRESS = '3MrtCAwzpyGd4gHfZvRRc3n3vJBceDLL7kg';

const BASE_URL = 'https://nodes-testnet.wavesnodes.com';

export function toShortTokenAmount(amount: string | number) {
  return (parseInt('' + amount) / WAVES).toString();
}
export function getUrl(url: string): string {
  return `${BASE_URL}/${url}`;
}

export function getDataUrl(matches: string): string {
  return getUrl(`addresses/data/${CONTRACT_ADDRESS}?matches=${matches}`);
}

export async function getCurrentHeight(): Promise<number> {
  return generalFetchWrapper(getUrl(`blocks/height`)).then((val) => val.height);
}

export async function getAuctionIds(
  organizer = '[A-Za-z0-9]{35}'
): Promise<string[]> {
  const res = await fetchWrapper(getDataUrl(organizer + '_organizer'));
  let auctionIds: string[] = [];
  for (let i = 0; i < res.length; i++) {
    auctionIds.push(
      ...res[i].value
        .trim()
        .split(' ')
        .filter((val) => val !== '')
    );
  }
  return auctionIds;
}

export async function getBidderAuctionIds(bidder: string): Promise<string[]> {
  const res = await fetchWrapper(getDataUrl(bidder + '_bidder'));
  let auctionIds: string[] = [];
  for (let i = 0; i < res.length; i++) {
    auctionIds.push(
      ...res[i].value
        .trim()
        .split(' ')
        .filter((val) => val !== '')
    );
  }
  return auctionIds;
}

export async function getAuctionDetails(auctionId: string) {
  // TODO: Add current user here
  const res = await fetchWrapper(getDataUrl(auctionId + '_.*'));
  const userRes = await fetchWrapper(
    getDataUrl(auctionId + '[A-Za-z0-9]{35}_.*')
  );
  const currentHeight = await getCurrentHeight();
  let auctionDetails: any = {
    id: res[0] && res[0].key.split('_')[0],
  };
  for (let i = 0; i < res.length; i++) {
    const key = res[i].key.substr(res[i].key.indexOf('_') + 1);
    const val = res[i].value;
    auctionDetails[key] = val;
  }

  for (let i = 0; i < userRes.length; i++) {
    const key = userRes[i].key.replace(auctionId, '');
    const val = userRes[i].value;
    auctionDetails[key] = val;
  }

  const revealStart = auctionDetails['reveal_start'];
  const settleStart = auctionDetails['closing_start'];

  auctionDetails['phase'] = 'BID';
  if (currentHeight >= revealStart && currentHeight < settleStart) {
    auctionDetails['phase'] = 'REVEAL';

    if (auctionDetails['unrevealed_count'] === 0) {
      auctionDetails['phase'] = 'SETTLE';
    }
  }
  if (currentHeight >= settleStart) {
    auctionDetails['phase'] = 'SETTLE';
  }

  auctionDetails['deltaReveal'] = revealStart - currentHeight;
  auctionDetails['deltaSettle'] = settleStart - currentHeight;

  return auctionDetails;
}

export async function getAuctions(): Promise<IAuctionDetails[]> {
  const auctionIds = await getAuctionIds();
  const promises = auctionIds.map((id) => getAuctionDetails(id));
  const auctions = await Promise.all(promises);
  return auctions;
}

export async function getAuctionsAsBidder(
  bidder: string
): Promise<IAuctionDetails[]> {
  const auctionIds = await getBidderAuctionIds(bidder);
  const promises = auctionIds.map((id) => getAuctionDetails(id));
  const auctions = await Promise.all(promises);
  return auctions;
}

export async function getBidsAsBidder(
  bidder: string
): Promise<BidWithAuction[]> {
  return getAuctionsAsBidder(bidder).then((auctions) =>
    auctions.map((auction) => {
      return {
        auctionId: auction.id,
        hash: auction[auction.id + bidder + '_bid_hash'],
        deposit: auction.deposit || 0,
        ...auction,
      };
    })
  );
}

export async function getAuctionsAsOrganizer(
  organizer?: string
): Promise<IAuctionDetails[]> {
  const auctionIds = await getAuctionIds(organizer);
  const promises = auctionIds.map((id) => getAuctionDetails(id));
  const auctions = await Promise.all(promises);
  return auctions;
}

export async function createLot(
  lot: ILot,
  sign: SignatureCallback
): Promise<TxResponse> {
  const tx = {
    type: 3,
    data: {
      name: lot.name,
      description: lot.imageUrl,
      quantity: 1,
      precision: 0,
      reissuable: false,
      fee: {
        tokens: '0.001',
        assetId: 'WAVES',
      },
    },
  };

  return sign(tx).then(JSON.parse);
}

export async function getLots(accountId: string): Promise<Array<NFT>> {
  const url = getUrl(`assets/nft/${accountId}/limit/100`);
  return generalFetchWrapper(url);
}

export async function getLot(lotId: string): Promise<NFT> {
  const url = getUrl(`assets/details/${lotId}`);
  return generalFetchWrapper(url);
}

export async function startAuction(
  auction: Auction,
  sign: SignatureCallback
): Promise<TxResponse> {
  if (auction.startPrice >= auction.deposit) {
    throw new Error('start price should NOT be >= deposit');
  }
  const tx = {
    type: 16,
    data: {
      fee: {
        tokens: '0.005',
        assetId: 'WAVES',
      },
      dApp: CONTRACT_ADDRESS,
      call: {
        function: 'startAuction',
        args: [
          {
            type: 'integer',
            value: auction.duration,
          },
          {
            type: 'integer',
            value: auction.startPrice * WAVES,
          },
          {
            type: 'string',
            value: auction.priceAssetId || 'WAVES',
          },
          {
            type: 'integer',
            value: auction.deposit * WAVES,
          },
        ],
      },
      payment: [
        {
          tokens: 1,
          assetId: auction.assetId,
        },
      ],
    },
  };

  return sign(tx).then(JSON.parse);
}

// Performs the following computation from smart contract in Typescript:
// base64(hash(SALT + bidAmount.toString()))
//
export function toHash(amount: number): HashedBid {
  const bidStr = (amount * WAVES).toString();
  const salt = randomStr();
  const strToHash = salt + bidStr;
  const bytesToHash = stringToBytes(strToHash);
  const hashBytes = sha256(bytesToHash);
  const hashedAmount = base64Encode(hashBytes);
  return {
    amount: bidStr,
    salt,
    hashedAmount,
  };
}

export async function bid(
  bid: Bid,
  sign: SignatureCallback
): Promise<TxResponse> {
  const tx = {
    type: 16,
    data: {
      fee: {
        tokens: 0.005,
        assetId: 'WAVES',
      },
      dApp: CONTRACT_ADDRESS,
      call: {
        function: 'bid',
        args: [
          {
            type: 'string',
            value: bid.auctionId,
          },
          {
            type: 'string',
            value: bid.hash,
          },
        ],
      },
      payment: [
        {
          tokens: '' + bid.deposit / WAVES,
          assetId: bid.priceAssetId || 'WAVES',
        },
      ],
    },
  };

  return sign(tx).then(JSON.parse);
}

export async function reveal(
  reveal: Reveal,
  sign: SignatureCallback
): Promise<TxResponse> {
  const tx = {
    type: 16,
    data: {
      fee: {
        tokens: 0.005,
        assetId: 'WAVES',
      },
      dApp: CONTRACT_ADDRESS,
      call: {
        function: 'reveal',
        args: [
          {
            type: 'string',
            value: reveal.auctionId,
          },
          {
            type: 'integer',
            value: reveal.amount,
          },
          {
            type: 'string',
            value: reveal.salt,
          },
        ],
      },
      payment: [],
    },
  };

  return sign(tx).then(JSON.parse);
}

export async function withdraw(
  auctionId: string,
  sign: SignatureCallback
): Promise<TxResponse> {
  const tx = {
    type: 16,
    data: {
      fee: {
        tokens: 0.005,
        assetId: 'WAVES',
      },
      dApp: CONTRACT_ADDRESS,
      call: {
        function: 'withdraw',
        args: [
          {
            type: 'string',
            value: auctionId,
          },
        ],
      },
      payment: [],
    },
  };

  return sign(tx).then(JSON.parse);
}

export async function getTxInfo(txid: string): Promise<Error | TxResponse> {
  const url = getUrl(`transactions/info/${txid}`);
  return generalFetchWrapper(url);
}

export async function awaitTx(txid: string): Promise<TxResponse> {
  return new Promise(function(resolve) {
    (async function wait() {
      const info = await getTxInfo(txid);
      if (!(info as Error).error) return resolve(info as TxResponse);
      setTimeout(wait, 300);
    })();
  });
}

export function randomStr() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
