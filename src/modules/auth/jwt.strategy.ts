import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ApiConfigService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(payload) {
    const { email } = payload;
    const user: UserEntity | undefined = await this.userRepository.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    return user;
  }
}
