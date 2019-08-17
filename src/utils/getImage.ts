import { Item } from '../types';

export function getImage(item: Item): string {
  const n =
    item.id.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0) % 15;

  return `https://placekitten.com/800/400?image=` + n;
}
