import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationDto } from './create-registration.dto';

export class UpdateRegistrationDto extends OmitType(CreateRegistrationDto, [
  'emailAddress',
  'password',
  'isActive',
] as const) {}
