import { BadRequestException, Injectable, NotFoundException, Session, Res } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { Response } from 'express';

import { SignUpDto, SignInDto } from '../database/dtos';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private readonly saltOrRounds = 10;

  async signUp({ name, email, password }: SignUpDto) {
    const hashedPassword = await hash(password, this.saltOrRounds);

    return await this.userService.create({ name, email, password: hashedPassword });
  }
  async signIn({ email, password }: SignInDto) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordCorrect = await this.verifyUser(password, user.password);

      if (isPasswordCorrect) {
        return user;
      }

      throw new BadRequestException();
    }

    throw new NotFoundException();
  }
  async signOut(@Session() session: Record<string, any>, @Res() response: Response) {
    console.log(session);
    session.cookie.expires = 0;

    await session.destroy(() => {
      response.redirect('/');
    });
  }

  private async verifyUser(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
