import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    length: 250,
  })
  title: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinTable()
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;
}
