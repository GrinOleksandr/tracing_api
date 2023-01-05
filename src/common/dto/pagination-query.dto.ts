import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */
export class PaginationQueryDto {
  @ApiProperty({
    description: 'the number of items to return',
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    description: 'the number of items to skip',
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skip?: number = 0;
}
