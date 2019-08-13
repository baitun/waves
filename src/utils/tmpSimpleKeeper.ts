/** This is temporary solution! I need to use KeeperHelper class instead */

import { IWavesKeeperOptions } from './keeper';

declare const WavesKeeper: { initialPromise: Promise<IWavesKeeperOptions> };

export function tmpKeeperInit() {
  return WavesKeeper.initialPromise.then((keeperApi: IWavesKeeperOptions) => {
    /*...init app*/
    return keeperApi.publicState().then((state) => {
      console.log({ state });
      return state;
    });
  });
}
