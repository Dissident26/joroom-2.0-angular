import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '../database/entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  findAllByPostId(id: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id } },
      select: {
        user: {
          id: true,
          name: true,
          isActive: true,
          imageUrl: true,
        },
        post: { id: true },
      },
    });
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
      select: {
        user: {
          id: true,
          name: true,
          isActive: true,
          imageUrl: true,
        },
        post: { id: true },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
