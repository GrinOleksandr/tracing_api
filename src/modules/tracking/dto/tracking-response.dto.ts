import { ApiProperty } from '@nestjs/swagger';
import { SearchSourcesDto } from './create-tracking.dto';
import { TRACKING_STATUS } from '../types';

export class TrackingResponseDto {
  @ApiProperty({
    type: String,
    example: '63b689a547b2ca109b379b30',
  })
  _id: string;

  @ApiProperty({
    type: String,
    example: 'Some word or phrase here',
  })
  word: string;

  @ApiProperty({
    enum: TRACKING_STATUS,
    example: TRACKING_STATUS.ACTIVE,
  })
  status: TRACKING_STATUS;

  @ApiProperty({
    example: {
      chats: true,
      channels: false,
    },
  })
  sources: SearchSourcesDto;

  @ApiProperty({
    type: Date,
    example: '2023-01-05T08:26:13.616Z',
  })
  createdAt: string;

  @ApiProperty({
    type: Date,
    example: '2023-01-05T08:26:13.616Z',
  })
  updatedAt: string;
}
