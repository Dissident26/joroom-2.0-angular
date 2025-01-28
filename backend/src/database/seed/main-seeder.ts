import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

import { Comment, Post, Tag, User } from '../entities';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userFactory = factoryManager.get(User);
    const tagFactory = factoryManager.get(Tag);
    const postsFactory = factoryManager.get(Post);
    const commentFactory = factoryManager.get(Comment);

    const postsRepository = dataSource.getRepository(Post);
    const commentRepository = dataSource.getRepository(Comment);

    const users = await userFactory.saveMany(50);
    const tags = await tagFactory.saveMany(100);

    const posts = await Promise.all(
      Array(200)
        .fill('')
        .map(async () => {
          return postsFactory.make({
            user: faker.helpers.arrayElement(users),
            tags: faker.helpers.arrayElements(tags, { min: 2, max: 10 }),
          });
        }),
    );

    const rootComments = await Promise.all(
      Array(faker.number.int({ min: 100, max: 500 }))
        .fill('')
        .map(async () => {
          return await commentFactory.make({
            post: faker.helpers.arrayElement(posts),
            user: faker.helpers.arrayElement(users),
          });
        }),
    );

    const nestedComments = await Promise.all(
      Array(faker.number.int({ min: 100, max: 500 }))
        .fill('')
        .map(async () => {
          return await commentFactory.make({
            post: faker.helpers.arrayElement(posts),
            user: faker.helpers.arrayElement(users),
            parent: faker.helpers.arrayElement(rootComments),
          });
        }),
    );

    await postsRepository.save(posts);
    await commentRepository.save([...rootComments, ...nestedComments]);
  }
}
