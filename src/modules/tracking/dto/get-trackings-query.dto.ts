import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SORT_FIELDS, SORT_ORDER } from '../../../common/types';
import { PaginationQueryDto } from '../../../common/dto';
import { TRACKING_STATUS } from '../types';

export class GetTrackingsQueryDto extends PaginationQueryDto {
  @ApiProperty({
    description: 'the column to sort by',
    example: 'createdAt',
  })
  @IsOptional()
  @IsEnum(SORT_FIELDS)
  col?: SORT_FIELDS = SORT_FIELDS.CREATED_AT;

  @ApiProperty({
    description: 'the order of sorting',
    example: 'desc',
  })
  @IsOptional()
  @IsEnum(SORT_ORDER)
  order?: SORT_ORDER = SORT_ORDER.DESC;

  @ApiProperty({
    description: 'filter by status',
    example: 'paused',
  })
  @IsOptional()
  @IsEnum(TRACKING_STATUS)
  status?: TRACKING_STATUS;
}
