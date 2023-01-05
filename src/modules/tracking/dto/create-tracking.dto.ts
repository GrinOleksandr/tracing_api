import { IsBoolean, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ISearchSources } from '../types';

export class SearchSourcesDto {
  @IsBoolean()
  channels: boolean;

  @IsBoolean()
  chats: boolean;
}

export class CreateTrackingDto {
  @ApiProperty({
    type: String,
    example: 'Some word or phrase here',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  word: string;

  @ApiProperty({
    example: {
      chats: true,
      channels: false,
    },
  })
  @Type(() => SearchSourcesDto)
  @ValidateNested()
  sources: ISearchSources;
}
