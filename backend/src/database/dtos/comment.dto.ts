import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PostDto, UserDto } from '.';

export class CommentDto {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;

  @ApiPropertyOptional({ type: () => CommentDto })
  parent: Comment | null;

  @ApiProperty({ type: () => PostDto })
  post: PostDto;

  @ApiProperty({
    type: String,
  })
  content: string;

  @ApiProperty({ type: Date })
  created_at: Date;
}
