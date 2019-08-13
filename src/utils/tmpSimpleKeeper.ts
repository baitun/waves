/** This is temporary solution! I need to use KeeperHelper class instead */

import { IWavesKeeperOptions } from './keeper';

declare const WavesKeeper: { initialPromise: Promise<IWavesKeeperOptions> };

export function tmpKeeperInit() {
  if (typeof WavesKeeper === 'undefined') {
    alert('Keeper is not installed!');
    throw new Error('Keeper is not installed!');
  }

  return WavesKeeper.initialPromise.then((keeperApi: IWavesKeeperOptions) => {
    return keeperApi.publicState().then((state) => {
      return state;
    });
  });
}
