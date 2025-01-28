import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';

import { Post } from '../../entities';

export const PostFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();

  post.title = faker.word.words({ count: { min: 1, max: 5 } });
  post.content = faker.word.words({ count: { min: 1, max: 50 } });

  return post;
});
