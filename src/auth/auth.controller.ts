import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Guards/jwtAuth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth } from './interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/login')
  async signIn(@Body() signInDto: SignInDto): Promise<Auth> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/register')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Auth> {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAuths(): Promise<Auth[]> {
    return await this.authService.getAuths();
  }
}
