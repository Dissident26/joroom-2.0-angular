import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';

import { User } from '../../entities';

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();

  user.name = faker.internet.userName();
  user.email = faker.internet.email();
  user.imageUrl = faker.image.avatar();
  user.description = faker.person.jobTitle();
  user.password = faker.internet.password();
  user.isActive = faker.datatype.boolean(0.9);

  return user;
});
