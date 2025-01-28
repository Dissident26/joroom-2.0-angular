import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { Post } from './post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable()
  posts: Post[];

  @Column('text')
  content: string;
}
