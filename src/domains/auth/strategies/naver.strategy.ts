import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { NaverValidateDto } from '../dto/naver-validate.dto';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientId: configService.get<string>('NAVER_CLIENT_ID'),
      clientSecret: configService.get<string>('NAVER_CLIENT_SECRET'),
      callbackURL: configService.get<string>('NAVER_CALLBACK_URL'),
    });
  }

  async validate(naverValidateDto: NaverValidateDto) {
    const { accessToken, refreshToken, profile } = naverValidateDto;
    const { id, email, nickname } = profile;

    return {
      id,
      email,
      nickname,
      accessToken,
      refreshToken,
    };
  }
}
