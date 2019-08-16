/** This is temporary solution! I need to use KeeperHelper class instead */

import { IWavesKeeperOptions, IPublicState } from './keeper';

declare const WavesKeeper: { initialPromise: Promise<IWavesKeeperOptions> };

export function tmpKeeperInit(): Promise<IPublicState> {
  return new Promise((resolve, reject) => {
    window.onload = function() {
      if (typeof WavesKeeper === 'undefined') {
        return reject('Keeper is not installed!');
      }

      WavesKeeper.initialPromise.then((keeperApi: IWavesKeeperOptions) => {
        keeperApi.publicState().then((state) => {
          console.log({ state });
          resolve(state);
        });
      });
    };
  });
}
