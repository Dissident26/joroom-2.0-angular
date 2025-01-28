import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

import { Post, Comment } from './';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 250,
  })
  name: string;

  @Column({
    unique: true,
    select: false,
  })
  email: string;

  @Column({
    type: String,
    select: false,
  })
  password: string;

  @Column({
    type: String,
    nullable: true,
  })
  imageUrl: string | null;

  @Column({
    type: String,
    nullable: true,
  })
  description: string | null;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;
}
