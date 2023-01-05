import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { TrackingService } from './tracking.service';
import {
  CreateTrackingDto,
  GetTrackingsQueryDto,
  TrackingResponseDto,
  UpdateTrackingDto,
} from './dto';
import { ITracking } from './types';
import { GetTrackingsPaginatedResponseDto } from './dto/get-trackings-paginated-response.dto';

@Controller()
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get()
  @ApiOperation({
    summary: 'Endpoint for getting the a list of all trackings',
    description: 'Endpoint for getting the a list of all trackings',
  })
  @ApiResponse({
    description: 'List of trackings has been successfully received',
    type: GetTrackingsPaginatedResponseDto,
    status: 200,
  })
  public async getTrackings(@Query() query: GetTrackingsQueryDto) {
    return this.trackingService.getTrackings(query);
  }

  @Post()
  @ApiOperation({
    summary: 'Endpoint for creating new tracking',
    description: 'Endpoint for creating new tracking',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: TrackingResponseDto,
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async createTracking(@Body() createTrackingDto: CreateTrackingDto): Promise<ITracking> {
    return this.trackingService.createTracking(createTrackingDto);
  }

  @Patch(':trackingId')
  @ApiOperation({
    summary: 'Endpoint for editing a tracking',
    description: 'Endpoint for editing a tracking',
  })
  @ApiResponse({
    description: 'The record has been successfully updated.',
    type: TrackingResponseDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Tracking not found' })
  async updateTracking(
    @Param('trackingId') trackingId: string,
    @Body() updateTrackingDto: UpdateTrackingDto,
  ): Promise<ITracking> {
    return this.trackingService.updateTracking(trackingId, updateTrackingDto);
  }

  @Delete(':trackingId')
  @ApiResponse({
    description: 'The record has been successfully deleted.',
    type: TrackingResponseDto,
    status: 200,
  })
  @ApiNotFoundResponse({ description: 'Tracking not found' })
  @ApiOperation({
    summary: 'Endpoint for deleting a tracking',
    description: 'Endpoint for deleting a tracking',
  })
  async deleteTracking(@Param('trackingId') trackingId: string): Promise<ITracking> {
    return this.trackingService.deleteTracking(trackingId);
  }
}
