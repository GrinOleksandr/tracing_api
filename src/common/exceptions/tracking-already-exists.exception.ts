import { HttpException, HttpStatus } from '@nestjs/common';

export class WordAlreadyExistsException extends HttpException {
  constructor(trackingId: string) {
    super(`Word already exists in tracking with id: ${trackingId}`, HttpStatus.BAD_REQUEST);
  }
}
