import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';

import { Tag } from '../../entities';

export const TagFactory = setSeederFactory(Tag, (faker: Faker) => {
  const tag = new Tag();

  tag.content = faker.word.words({ count: { min: 1, max: 5 } });

  return tag;
});
