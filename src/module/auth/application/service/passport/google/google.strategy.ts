import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleStrategyOptions } from './google.options';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly options: GoogleStrategyOptions) {
    super(options.getOptions());
  }

  authorizationParams(): { [key: string]: string } {
    return this.options.getAuthorizationParams();
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
    const { name, emails, provider } = profile;
    try {
      done(null, {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        socialProvider: provider,
        externalId: profile.id,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      done(err);
    }
  }
}
