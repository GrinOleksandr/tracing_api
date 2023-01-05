import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { TrackingController } from './tracking.controller';
import { Tracking, TrackingSchema } from './tracking.schema';
import { TrackingService } from './tracking.service';
import { CreateTrackingDtoStub, UpdateTrackingDtoStub } from '../../../test/stubs';
import { TrackingNotFoundException, WordAlreadyExistsException } from '../../common/exceptions';
import { ITracking, TRACKING_STATUS } from './types';
import { SORT_ORDER } from '../../common/types';

function checkAllTrackingFields(tracking: ITracking): boolean {
  return (
    Boolean(tracking.word) &&
    Boolean(tracking.status) &&
    Boolean(tracking.sources) &&
    Boolean(tracking.createdAt) &&
    Boolean(tracking.updatedAt)
  );
}

describe('TrackingController', () => {
  let trackingController: TrackingController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let TrackingModel: Model<Tracking>;
  const randomObjectId = '63b69a292ce46d0347379d54';
  const testWord = 'testWord';

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    TrackingModel = mongoConnection.model(Tracking.name, TrackingSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [
        TrackingService,
        { provide: getModelToken(Tracking.name), useValue: TrackingModel },
      ],
    }).compile();
    trackingController = app.get<TrackingController>(TrackingController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const { collections } = mongoConnection;
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('getTrackings', () => {
    it('should get a full list of Trackings without any params', async () => {
      const responseMatchingObject = {
        skip: 0,
        limit: 10,
        total: 15,
      };

      for (let i = 1; i <= 15; i++) {
        await new TrackingModel(CreateTrackingDtoStub(String(i))).save();
      }

      const response = await trackingController.getTrackings({});

      expect(response).toMatchObject(responseMatchingObject);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data[0]).toHaveProperty('word', '15');
    });

    it('should apply a sorting by createdAt field', async () => {
      const responseMatchingObject = {
        skip: 0,
        limit: 10,
        total: 15,
      };

      for (let i = 1; i <= 15; i++) {
        await new TrackingModel(CreateTrackingDtoStub(String(i))).save();
      }

      const response = await trackingController.getTrackings({ order: SORT_ORDER.ASC });

      expect(response).toMatchObject(responseMatchingObject);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data[0]).toHaveProperty('word', '1');
    });
  });

  it('should apply a pagination params', async () => {
    const responseMatchingObject = {
      skip: 5,
      limit: 5,
      total: 15,
    };

    for (let i = 1; i <= 15; i++) {
      await new TrackingModel(CreateTrackingDtoStub(String(i))).save();
    }

    const response = await trackingController.getTrackings({ skip: 5, limit: 5 });

    expect(response).toMatchObject(responseMatchingObject);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(5);
    expect(response.data[0]).toHaveProperty('word', '10');
  });

  it('should apply a filtering by status', async () => {
    const responseMatchingObject = {
      skip: 0,
      limit: 10,
      total: 3,
    };

    for (let i = 1; i <= 15; i++) {
      const data = CreateTrackingDtoStub(String(i));
      let status = TRACKING_STATUS.ACTIVE;
      if (i % 4 === 0) {
        status = TRACKING_STATUS.PAUSED;
      }
      const newTracking = await new TrackingModel(data);
      newTracking.status = status;
      await newTracking.save();
    }

    const response = await trackingController.getTrackings({ status: TRACKING_STATUS.PAUSED });

    expect(response).toMatchObject(responseMatchingObject);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(3);
    expect(response.data[0]).toHaveProperty('word', '12');
  });

  describe('createTracking', () => {
    it('should create a Tracking', async () => {
      const createdTracking = await trackingController.createTracking(
        CreateTrackingDtoStub(testWord),
      );

      expect(checkAllTrackingFields(createdTracking)).toBe(true);
      expect(createdTracking.word).toBe(CreateTrackingDtoStub(testWord).word);
    });

    it('should return WordAlreadyExists (Bad Request - 400) exception on Tracking creation', async () => {
      await new TrackingModel(CreateTrackingDtoStub(testWord)).save();
      await expect(
        trackingController.createTracking(CreateTrackingDtoStub(testWord)),
      ).rejects.toThrow(WordAlreadyExistsException);
    });
  });

  describe('updateTracking', () => {
    it('should update a Tracking', async () => {
      const createdTracking = await new TrackingModel(CreateTrackingDtoStub(testWord)).save();

      const updatedTracking = await trackingController.updateTracking(
        String(createdTracking._id),
        UpdateTrackingDtoStub(testWord),
      );

      expect(checkAllTrackingFields(updatedTracking)).toBe(true);
      expect(updatedTracking).toMatchObject(UpdateTrackingDtoStub(testWord));
    });

    it('should return WordAlreadyExists (Bad Request - 400) exception if not unique new word is set', async () => {
      await new TrackingModel(CreateTrackingDtoStub(testWord)).save();
      const trackingToUpdate = await new TrackingModel(
        CreateTrackingDtoStub(`${testWord}1`),
      ).save();

      await expect(
        trackingController.updateTracking(
          String(trackingToUpdate._id),
          UpdateTrackingDtoStub(testWord),
        ),
      ).rejects.toThrow(WordAlreadyExistsException);
    });

    it('should return TrackingNotFound (Not Found - 404) if Tracking is not found', async () => {
      await expect(
        trackingController.updateTracking(randomObjectId, UpdateTrackingDtoStub(testWord)),
      ).rejects.toThrow(TrackingNotFoundException);
    });
  });

  describe('deleteTracking', () => {
    it('should delete a Tracking', async () => {
      const createdTracking = await new TrackingModel(CreateTrackingDtoStub(testWord)).save();

      const deletedTracking = await trackingController.deleteTracking(String(createdTracking._id));

      expect(checkAllTrackingFields(deletedTracking)).toBe(true);
    });

    it('should return TrackingNotFound (Not Found - 404) if Tracking is not found', async () => {
      await expect(
        trackingController.updateTracking(randomObjectId, UpdateTrackingDtoStub(testWord)),
      ).rejects.toThrow(TrackingNotFoundException);
    });
  });
});
