import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Comment)
  @JoinColumn()
  parent: Comment | null = null;

  @ManyToOne(() => Post)
  @JoinColumn()
  post: Post;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
