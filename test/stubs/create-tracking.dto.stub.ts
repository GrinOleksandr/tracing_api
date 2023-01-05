import { CreateTrackingDto } from '../../src/modules/tracking/dto';

export const CreateTrackingDtoStub = (word: string): CreateTrackingDto => ({
  word,
  sources: {
    chats: true,
    channels: true,
  },
});
