import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { SignInAuthDto } from './dto/sign-in-auth-dto';
import { GetUser } from './get-user.decorator';

class AuthResponse {
  accessToken: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(AuthGuard())
  validateUser(@GetUser() user: UserEntity) {
    return {
      email: user.email,
      username: user.username,
    };
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    type: AuthResponse,
  })
  signIn(@Body(ValidationPipe) signInAuthDto: SignInAuthDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInAuthDto);
  }
}
