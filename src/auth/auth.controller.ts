import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { SignInAuthDto } from './dto/sign-in-auth-dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  validateUser(@GetUser() user: UserEntity) {
    return {
      email: user.email,
      username: user.username,
    };
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInAuthDto: SignInAuthDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInAuthDto);
  }
}
