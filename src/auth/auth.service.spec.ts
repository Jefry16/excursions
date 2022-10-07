import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { WhiteListService } from './white-list.service';
describe('AuthService', () => {
  let service: AuthService;
  const fakeUsersService = {};
  const fakeWhiteList = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
        { provide: WhiteListService, useValue: fakeWhiteList },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
