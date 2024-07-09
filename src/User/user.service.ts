import {
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
// import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  registerUser(userDto: CreateRegistrationDto): Promise<User> {
    const user: User = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.emailAddress = userDto.emailAddress;
    user.phoneNumber = userDto.phoneNumber;
    user.password = userDto.password; // this password is meant to be hashed
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
    //hash password and check for validatory as well
    //this should contain the token as well
    const validUser = await this.usersRepository.findOne({
      where: {
        emailAddress: loginUserDto.EmailAddress,
        password: loginUserDto.Password, //validate hashed password
      },
    }); //payload for jwt && assign to req.user
    if (!validUser || validUser == null) {
      throw new UnauthorizedException();
    }
    const payload = { ...validUser };
    const generateJwtToken = await this.jwtService.signAsync(payload); //this should be a stand alone method or service
    // return -> object , JWT token

    return { user: validUser, token: generateJwtToken };
  }

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
