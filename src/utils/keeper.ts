import { Observable, timer } from 'rxjs';
import { delay, map, retryWhen, take } from 'rxjs/operators';

declare const WavesKeeper: IWavesKeeperOptions;

export type IWavesNetworkCode = 'W' | 'T';

export interface IPublicState {
  initialized: boolean;
  locked?: boolean;
  account?: {
    address: string;
    balance: { available: string; leasedOut: string };
    name: string;
    networkCode: string;
    network: string;
    publicKey: string;
    type: string;
  };
  network?: {
    code: IWavesNetworkCode;
    matcher: string;
    server: string;
  };
}

export interface IWavesKeeperAuthData {
  data: string;
  name?: string;
  referrer?: string;
  icon?: string;
}

export interface IWavesKeeperAuthResult {
  address: string;
  data: string;
  host: string;
  prefix: string;
  publicKey: string;
  signature: string;
}

export interface IWavesKeeperOptions {
  auth: (authData: IWavesKeeperAuthData) => Promise<IWavesKeeperAuthResult>;
  publicState: () => Promise<IPublicState>;
  signAndPublishOrder: (order: { type: number; data: any }) => Promise<string>;
  signAndPublishTransaction: (transaction: {
    type: number;
    data: any;
  }) => Promise<string>;
  on: (ev: 'update', cb: (state: IPublicState) => void) => void;
}

class KeeperHelper {
  constructor() {}

  get keeper(): IWavesKeeperOptions | undefined {
    if (
      typeof WavesKeeper === 'undefined' ||
      !WavesKeeper ||
      !WavesKeeper.publicState
    ) {
      return;
    } else {
      return <IWavesKeeperOptions>WavesKeeper;
    }
  }

  async init(): Promise<IWavesKeeperOptions | undefined> {
    return new Promise(async (resolve, reject) => {
      const keeperObs = this._getKeeperObs();

      keeperObs.subscribe(
        (val) => {
          console.info('Keeper initialized');
          resolve(val);
        },
        (err) => {
          reject('No Keeper detected');
        },
        () => {
          if (!this.keeper) {
            reject('No Keeper detected');
          }
        }
      );
    });
  }

  getPublicState(): IPublicState {
    const storageItem = localStorage.getItem('publicState');
    return storageItem && JSON.parse(storageItem);
  }

  setPublicState(publicState: IPublicState | null): void {
    localStorage.setItem('publicState', JSON.stringify(publicState));
  }

  _getKeeperObs(): Observable<IWavesKeeperOptions | undefined> {
    return timer(200).pipe(
      map(() => {
        if (!this.keeper) {
          throw false;
        }
        return this.keeper;
      }),
      retryWhen((errs) =>
        errs.pipe(
          delay(200),
          take(4)
        )
      )
    );
  }
}

export default new KeeperHelper();
