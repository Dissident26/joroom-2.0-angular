import { Get, Controller, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TagService } from './tag.service';
import { Post, Tag, PostDto, TagDto } from '../database';
import { FindOneParams } from '../validation';

@ApiTags('Tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOkResponse({ type: TagDto, isArray: true })
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get('/:id') //TODO: revisit usefullness of this endpont
  @ApiOkResponse({ type: TagDto })
  findOne(@Param() { id }: FindOneParams): Promise<Tag | null> {
    return this.tagService.findOne(Number(id));
  }

  @Get('/:id/post')
  @ApiOkResponse({ type: PostDto, isArray: true })
  findAllPostsByTagId(@Param() { id }: FindOneParams): Promise<Post[]> {
    return this.tagService.findAllPostsByTagId(Number(id));
  }

  @Delete('/:id')
  async delete(@Param() { id }: FindOneParams): Promise<void> {
    await this.tagService.delete(Number(id));
  }
}
