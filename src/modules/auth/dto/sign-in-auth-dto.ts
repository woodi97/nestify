import { IsNotEmpty, IsString } from 'class-validator';

export class SignInAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
