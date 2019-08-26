import { Item } from '../types';
import { getLot } from '../utils/api';

export async function getImage(item: Item): Promise<string> {
  return getLot(item.lot_assetId || '').then((lot) => lot.description);
}
