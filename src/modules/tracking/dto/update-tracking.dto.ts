import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ISearchSources, TRACKING_STATUS } from '../types';
import { SearchSourcesDto } from './create-tracking.dto';

export class UpdateTrackingDto {
  @ApiProperty({
    type: String,
    example: 'Some word or phrase here',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  @IsOptional()
  word?: string;

  @ApiProperty({
    example: {
      chats: true,
      channels: false,
    },
  })
  @Type(() => SearchSourcesDto)
  @ValidateNested()
  @IsOptional()
  sources?: ISearchSources;

  @ApiProperty({
    example: TRACKING_STATUS.PAUSED,
  })
  @IsOptional()
  @IsEnum(TRACKING_STATUS)
  status?: TRACKING_STATUS;
}
