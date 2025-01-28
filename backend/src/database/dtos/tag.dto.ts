import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  content: string;
}
