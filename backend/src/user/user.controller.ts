import { Get, Controller, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User, Post, Comment, UserDto, PostDto, CommentDto } from '../database';
import { FindOneParams } from '../validation';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param() { id }: FindOneParams): Promise<User | null> {
    return this.userService.findOne(Number(id));
  }

  @Delete('/:id')
  async delete(@Param() { id }: FindOneParams): Promise<void> {
    await this.userService.delete(Number(id));
  }

  @Get('/:id/posts')
  @ApiOkResponse({ type: PostDto, isArray: true })
  findAllPostsByUserId(@Param() { id }: FindOneParams): Promise<Post[] | null> {
    return this.userService.findAllPostsByUserId(Number(id));
  }

  @Get('/:id/comments')
  @ApiOkResponse({ type: CommentDto, isArray: true })
  findAllCommentsByUserId(@Param() { id }: FindOneParams): Promise<Comment[] | null> {
    return this.userService.findAllCommentsByUserId(Number(id));
  }
}
