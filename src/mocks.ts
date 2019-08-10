import { Item } from './types';
import faker from 'faker';

export const MOCK_ITEMS: Item[] = Array.from({ length: 5 }).map(() => ({
  uuid: faker.random.uuid(),
  name: faker.random.words(2),
  imageUrl: `https://placekitten.com/400/200?image=${faker.random.number(20)}`,
  bids: faker.random.number(100),
  price: Math.random() * 100,
  endDate: faker.date.future().valueOf(),
}));
