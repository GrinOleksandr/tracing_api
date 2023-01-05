import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from '../../../common/dto';
import { TrackingResponseDto } from './tracking-response.dto';

export class GetTrackingsPaginatedResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: () => [TrackingResponseDto] })
  data: TrackingResponseDto[];
}
