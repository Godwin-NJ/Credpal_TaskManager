import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(userDto: CreateRegistrationDto): Promise<User> {
    const userExist = await this.usersRepository.find({
      where: { emailAddress: userDto.emailAddress },
    });

    if (userExist.length > 0) {
      throw new BadRequestException('User already exist');
    }
    const hashedPassword = await this.hashPassword(userDto.password);
    const user: User = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.emailAddress = userDto.emailAddress;
    user.phoneNumber = userDto.phoneNumber;
    user.password = hashedPassword; // this password is meant to be hashed
    user.isActive = userDto.isActive;
    user.createDate = userDto.createdDate ? userDto.createdDate : new Date(); // set this default from the entity;
    return this.usersRepository.save(user);
  }

  updateUser(id: number, userUpdateDto: UpdateRegistrationDto) {
    // const user = new User();
    const updateUser = this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        firstName: userUpdateDto.firstName,
        lastName: userUpdateDto.lastName,
        phoneNumber: userUpdateDto.phoneNumber,
        createDate: userUpdateDto.createdDate,
      })
      .where('id = :id', { id })
      .execute();

    if (!updateUser) {
      throw new NotFoundException();
    }

    //user.id = id;
    //user.lastName = userUpdateDto.
    return updateUser;
  }

  async loginUser(loginUserDto: UserLoginDto) {
    const userExist = await this.usersRepository.findOne({
      where: {
        emailAddress: loginUserDto.EmailAddress,
      },
    });

    if (!userExist || userExist == null) {
      throw new BadRequestException('User does not exist');
    }

    const validUser = await this.compareHashedPassword(
      loginUserDto.Password,
      userExist.password,
    );

    if (!validUser) {
      throw new UnauthorizedException();
    }

    const payload = { ...userExist };
    const generateJwtToken = await this.jwtService.signAsync(payload);

    return { user: userExist, token: generateJwtToken };
  }

  hashPassword = async (password: string) => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new BadRequestException('Error hashing password');
    }
  };

  compareHashedPassword = async (password, hashPassword) => {
    const isValid = await bcrypt.compare(password, hashPassword);
    if (!isValid) {
      return false;
    }
    return true;
  };

  //I need to have a middleware to validate the token being sent -> Very important

  // findAll() {
  //   return `This action returns all registration`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} registration`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} registration`;
  // }
}
