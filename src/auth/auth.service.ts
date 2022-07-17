import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import type { AuthCredentialDto } from './dto/auth-credential.dto';
import type { SignInAuthDto } from './dto/sign-in-auth-dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<UserEntity> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(signInAuthDto: SignInAuthDto): Promise<UserEntity | undefined> {
    return this.userRepository.validateUserPassword(signInAuthDto);
  }
}
