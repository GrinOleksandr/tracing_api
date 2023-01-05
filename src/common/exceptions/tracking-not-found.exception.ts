import { HttpException, HttpStatus } from '@nestjs/common';

export class TrackingNotFoundException extends HttpException {
  constructor(trackingId: string) {
    super(`Tracking id: ${trackingId} not found`, HttpStatus.NOT_FOUND);
  }
}
