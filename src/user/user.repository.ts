import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';

import type { AuthCredentialDto } from '../auth/dto/auth-credential.dto';
import type { SignInAuthDto } from '../auth/dto/sign-in-auth-dto';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(authCredentialsDto: AuthCredentialDto): Promise<void> {
    const { username, email, password } = authCredentialsDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = this.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : error;
    }
  }

  async validateUserPassword(signInAuthDto: SignInAuthDto): Promise<void> {
    const { email, password } = signInAuthDto;

    const result = await this.findOne({ email });

    if (!(result && (await compare(password, result.password)))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
