import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new BadRequestException('Error hashing password');
  }
};

// export const compareHashedPassword = (password) => {

// const isValid = bcrypt.compare(password, hash)
// }
