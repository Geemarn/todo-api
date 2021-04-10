import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Guards/jwtAuth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth } from './interfaces/auth.interfaces';
import { response } from '../_shared/constant';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.signIn(signInDto);
    return res.json(response(HttpStatus.OK, result.data, result.token));
  }

  @Post('/register')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.signUp(signUpDto);
    return res.json(response(HttpStatus.OK, result.data, result.token));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAuths(): Promise<Auth[]> {
    return await this.authService.getAuths();
  }
}
