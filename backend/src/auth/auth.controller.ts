import { Controller, Post, Session, Res, Body, ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from '../database/dtos';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpData: SignUpDto) {
    this.authService.signUp(signUpData);
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  signIn(@Body() signInData: SignInDto) {
    this.authService.signIn(signInData);
  }

  @Post('sign-out')
  signOut(@Session() session: Record<string, any>, @Res() response: Response) {
    this.authService.signOut(session, response);
  }
}
