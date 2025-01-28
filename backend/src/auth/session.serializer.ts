import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: CallableFunction): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: CallableFunction): any {
    done(null, payload);
  }
}
