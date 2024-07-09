export class CreateRegistrationDto {
  firstName: string;
  lastName: string;
  emailAddress: string; //add email validation here
  password: string;
  phoneNumber: string;
  isActive: boolean;
  createdDate: Date;
}
