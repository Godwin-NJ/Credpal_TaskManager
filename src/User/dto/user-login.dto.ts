import { IsNotEmpty, Min, IsEmail } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  EmailAddress: string;

  @IsNotEmpty()
  @Min(6)
  Password: string; //add email validation here
}
