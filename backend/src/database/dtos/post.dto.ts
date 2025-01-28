import { ApiProperty } from '@nestjs/swagger';

import { CommentDto, TagDto, UserDto } from '.';

export class PostDto {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;

  @ApiProperty({
    type: String,
    maxLength: 250,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  content: string;

  @ApiProperty({ type: () => TagDto, isArray: true })
  tags: TagDto[];

  @ApiProperty({ type: () => CommentDto, isArray: true })
  comments: CommentDto[];

  @ApiProperty({ type: Date })
  created_at: Date;
}
