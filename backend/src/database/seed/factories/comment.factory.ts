import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';

import { Comment } from '../../entities';

export const CommentFactory = setSeederFactory(Comment, (faker: Faker) => {
  const comment = new Comment();

  comment.content = faker.word.words({ count: { min: 1, max: 20 } });

  return comment;
});
