import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import type { AuthCredentialDto } from '../auth/dto/auth-credential.dto';
import type { SignInAuthDto } from '../auth/dto/sign-in-auth-dto';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(authCredentialsDto: AuthCredentialDto): Promise<UserEntity> {
    const found = await this.findOne({ email: authCredentialsDto.email });

    if (found) {
      throw new BadRequestException(`User with email ${authCredentialsDto.email} already exists`);
    }

    const user = this.create({
      ...authCredentialsDto,
    });

    await this.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.findOne({ email });
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.findOne({ username });
  }

  async validateUserPassword(signInAuthDto: SignInAuthDto): Promise<UserEntity | undefined> {
    const { email, password } = signInAuthDto;

    const result = await this.findOne({ email });

    if (!result) {
      throw new NotFoundException(`Can't find User with email ${email}`);
    }

    if (result.password !== password) {
      throw new NotFoundException(`Wrong password for User with email ${email}`);
    }

    return result;
  }
}
