import { Item } from './types';
import faker from 'faker';

export const MOCK_ITEMS: Item[] = Array.from({ length: 5 }).map(() => {
  const imageNumber = faker.random.number(15);
  return {
    uuid: faker.random.uuid(),
    name: faker.random.words(2),
    author: faker.name.findName(),
    thumbnail: `https://placekitten.com/400/200?image=${imageNumber}`,
    image: `https://placekitten.com/800/400?image=${imageNumber}`,
    bids: faker.random.number(100),
    price: faker.random.number(1000),
    endDate: faker.date.future().valueOf(),
  };
});
