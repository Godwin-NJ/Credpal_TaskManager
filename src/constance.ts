import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  // secret: new ConfigService().get<string>('jwtSecret'),
  // secret: process.env.jwtSecret,
  secret: process.env.jwtSecret,
  // 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
