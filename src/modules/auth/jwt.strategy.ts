import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';
import { IJwtPayload } from '../../types/jwt-payload';
import { jwtConfig } from '../../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: IJwtPayload, done: VerifiedCallback) {
    const userId = parseInt(payload.id);
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      return done(new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED), false);
    }
    return done(null, user, payload.iat);
  }
}
