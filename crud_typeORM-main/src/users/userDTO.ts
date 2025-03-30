import { IsEmail } from 'class-validator';

export class UserDTO {
  name: string;
  @IsEmail()
  email: string;
  age: number;
  status: boolean;
}
