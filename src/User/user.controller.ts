import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  ExecutionContext,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
// import { AuthGuard } from 'src/Guards/auth.guard';
import { AllowAnon } from 'src/auth.decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AllowAnon()
  @Post('registeruser')
  registerUser(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.userService.registerUser(createRegistrationDto);
  }

  @Patch('updateuser/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return this.userService.updateUser(+id, updateRegistrationDto);
  }

  @AllowAnon()
  @Post('login')
  @HttpCode(200)
  loginUser(@Body() login: UserLoginDto) {
    return this.userService.loginUser(login);
  }

  // @AllowAnon()
  @Get('getUserInformation')
  @HttpCode(200)
  getUserInformation(@Req() req: Request) {
    return this.userService.getUserFromToken(req);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
