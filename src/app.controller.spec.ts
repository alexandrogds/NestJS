import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const mockMessage = 'Hello World!';
      const dummyNext = {};
      const dummyRes = {};
      const dummyReq = {};
      
      jest.spyOn(appService, 'getHello').mockReturnValue(mockMessage);

      const result = appController.getHello(dummyNext, dummyRes, dummyReq);

      expect(result).toBe(mockMessage);
    });
  });
});
