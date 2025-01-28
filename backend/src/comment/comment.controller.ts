import { Get, Delete, Controller, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CommentService } from './comment.service';
import { Comment, CommentDto } from '../database';
import { FindOneParams } from '../validation';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:id')
  @ApiOkResponse({ type: CommentDto })
  findOne(@Param() { id }: FindOneParams): Promise<Comment | null> {
    return this.commentService.findOne(Number(id));
  }

  @Delete('/:id')
  delete(@Param() { id }: FindOneParams): Promise<void> {
    return this.commentService.delete(Number(id));
  }
}
