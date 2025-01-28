import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { User, Post, Comment, Tag } from '../entities';
import { UserFactory, PostFactory, CommentFactory, TagFactory } from './factories';
import MainSeeder from './main-seeder';

const connectionOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Post, Comment, Tag],
  factories: [UserFactory, PostFactory, CommentFactory, TagFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(connectionOptions);

try {
  dataSource.initialize().then(async () => {
    console.log('*** SEEDER STARTED ***');

    await dataSource.synchronize(true);
    await runSeeders(dataSource);

    console.log('*** DB SEEDED SUCCESSFULLY ***');

    process.exit();
  });
} catch (e) {
  console.error(e);
}
