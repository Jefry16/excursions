import { Test, TestingModule } from '@nestjs/testing';
import { WhiteListService } from './white-list.service';
import { WhiteList } from './whitelist-token.entity';
describe('WhiteListService', () => {
  let service: WhiteListService;

  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhiteListService,
        // { provide: WhiteList, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<WhiteListService>(WhiteListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
