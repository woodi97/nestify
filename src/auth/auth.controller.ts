import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import type { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { SignInAuthDto } from './dto/sign-in-auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<UserEntity> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInAuthDto: SignInAuthDto): Promise<UserEntity | undefined> {
    return this.authService.signIn(signInAuthDto);
  }
}
