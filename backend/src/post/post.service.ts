import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post, Comment } from '../database/entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['user', 'tags', 'comments', 'comments.user'],
    });
  }

  findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'tags', 'comments', 'comments.user'],
    });
  }

  async findAllCommentsByPostId(id: number): Promise<Comment[]> {
    const post = await this.postRepository.findOne({
      where: {
        comments: { post: { id } },
      },
      relations: ['comments', 'comments.user'],
    });

    return post?.comments || [];
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
