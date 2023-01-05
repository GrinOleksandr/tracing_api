import { ApiProperty } from '@nestjs/swagger';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */
export class PaginationResponseDto {
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'the number of items to return, default 10',
  })
  limit?: number;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'the number of items to skip, default 0',
  })
  skip?: number;

  @ApiProperty({
    type: Number,
    example: 999,
    description: 'total number of items found',
  })
  total: number;
}
