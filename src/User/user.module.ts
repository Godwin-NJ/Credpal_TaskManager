import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/constance';
import { AuthGuard } from 'src/Guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.jwtSecret,
      // secret: jwtConstants.secret,
      // secret: new ConfigService().get<string>('jwtSecret'),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
