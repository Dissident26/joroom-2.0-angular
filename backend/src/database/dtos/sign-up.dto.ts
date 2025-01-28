import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    uniqueItems: true,
    maxLength: 50,
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
    uniqueItems: true,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  password: string;
}
