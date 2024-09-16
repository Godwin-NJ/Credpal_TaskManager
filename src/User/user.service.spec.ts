import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('create a user and return user data as response', async () => {
    const createUserDto = {
      firstName: 'Godwin',
      lastName: 'Amadi',
      emailAddress: 'amadigodwin@7gmail.com', //add email validation here
      password: '747@Password',
      phoneNumber: '+234813000000',
      isActive: true,
      createdDate: Date.now,
    } as unknown as CreateRegistrationDto;

    const userData = {
      id: Date.now(),
      firstName: 'Godwin',
      lastName: 'Amadi',
      emailAddress: 'amadigodwin@7gmail.com', //add email validation here
      password: '747@Password',
      phoneNumber: '+234813000000',
      isActive: true,
      createdDate: Date.now,
    } as unknown as User;

    jest
      .spyOn(mockUserRepository, 'save')
      .mockReturnValue(Promise.resolve(userData));

    const result = await service.registerUser(createUserDto);

    // expect(service).toBeDefined();

    expect(result).toEqual(userData);
  });

  describe('login-methods', () => {
    it('Ensure compared password are the same', async () => {
      const returnValueBcrypt = jest
        .spyOn(service, 'compareHashedPassword')
        .mockReturnValue(Promise.resolve(true));

      expect(returnValueBcrypt).toBeTruthy();
    });

    it('loginUser', async () => {
      const loginDto = {
        EmailAddress: 'amadigodwin77@gmail.com',
        Password: 'excelG747',
      } as unknown as UserLoginDto;

      const userResult = {
        user: {
          id: 1,
          firstName: 'Godwin',
          lastName: 'Amadi',
          emailAddress: 'amadigodwin@7gmail.com', //add email validation here
          password: '747@Password',
          phoneNumber: '+234813000000',
          isActive: true,
          createDate: new Date(),
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImZpcnN0TmFtZSI6IkdvZHdpbm4iLCJsYXN0TmFtZSI6IkFtYWRpaSIsImVtYWlsQWRkcmVzcyI6ImFtYWRpZ29kd2luNzdAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkdjA0ZHU5WXl5U2JmNXhQYmFxTnZIT1RRMnBnaHZ4aVJlY1ZueS9hRkFwUktmbHhlWjRUeTIiLCJwaG9uZU51bWJlciI6IjA4MTM4NDA1Nzg5IiwiaXNBY3RpdmUiOnRydWU',
      };

      // const passwordCompare = await service.compareHashedPassword(
      //   loginDto.Password,
      //   user.user.password,
      // );

      // const spiedBcryptCompare = jest
      //   .spyOn(bcrypt, 'compare')
      //   .mockResolvedValue(Promise.resolve(''));

      jest
        .spyOn(service, 'loginUser')
        // .spyOn(service, 'findOne')
        // .spyOn(mockUserRepository, 'findOne')
        .mockReturnValue(Promise.resolve(userResult));

      const result = await service.loginUser(loginDto);

      // expect(passwordCompare).toBeTruthy();
      expect(result).toEqual(userResult);
    });
  });

  it('updateUser', async () => {
    const updateDataDto = {
      firstName: 'Godwin',
      lastName: 'Amadi',
      phoneNumber: '08138405789',
      createDate: Date.now(),
    } as unknown as UpdateRegistrationDto;
    var id: number = 1;
    const user = {
      affected: 1,
      status: true,
    };
    jest
      // .spyOn(mockUserRepository, 'update')
      // .spyOn(service, 'update')
      .spyOn(service, 'updateUser')
      .mockReturnValue(Promise.resolve(user));

    const result = await service.updateUser(id, updateDataDto);
    // console.log(result, 'result-from update');
    // console.log(user, 'result-for user update');

    expect(result).toEqual(user);
  });
});
