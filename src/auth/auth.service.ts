import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Document, Model } from 'mongoose';
import { User } from '../user/interfaces/user.interfaces';
import { Auth } from './interfaces/auth.interfaces';
import { SignUpDto } from './dto/sign-up.dto';
import { ErrorException } from 'src/_shared/error-exception';
import { UserService } from 'src/user/service/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SCryptCryptoFactory } from '@tpboard/slibs/dist';
import { jwtSecret } from 'src/_shared/constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') protected authModel: Model<Auth & Document>,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  /**
   * @param {email} email: email gotten from payload
   * @param {password} password: password gotten from payload
   * @return {Object} returns a user object
   */
  async validate(email: string, password: string): Promise<any | null> {
    const user = await this.userService.getUserByEmail(email);
    const auth = await this.authModel
      .findOne({ email: email })
      .select('+password');
    if (!user || !auth) {
      throw ErrorException.ACCOUNT_NOT_FOUND;
    }
    const isAuthenticated = await SCryptCryptoFactory.compare(
      password,
      auth.password,
    );
    if (!isAuthenticated) {
      throw ErrorException.AUTHENTICATION_FAILED;
    }
    return isAuthenticated ? { user, auth } : null;
  }

  /**
   * @param {SignInDto} signInDto: SignUpDto gotten from payload
   * @return {Object} returns an access token
   */
  async signIn(signInDto: SignInDto): Promise<any> {
    const validatedPayload: any = await this.validate(
      signInDto.email,
      signInDto.password,
    );
    const signInPayload = {
      email: validatedPayload.user.email,
      sub: validatedPayload.user.userId,
    };
    return {
      meta: {
        code: 200,
        success: true,
        token: this.jwt.sign(signInPayload),
      },
      data: {
        ...validatedPayload.user.toObject(),
        auth: {
          email: validatedPayload.auth.email,
        },
      },
    };
  }

  /**
   * @param {SignUpDto} signUpDto: SignUpDto gotten from payload
   * @return {Object} returns a saved auth object
   */
  async signUp(signUpDto: SignUpDto): Promise<any> {
    let auth = await this.authModel.findOne({ email: signUpDto.email });
    if (auth) {
      throw ErrorException.USER_EXIST;
    }
    const authObject: any = {
      email: signUpDto.email,
      password: signUpDto.password,
    };
    auth = await this.authModel.create(authObject);

    const userPayload: any = {
      _id: auth._id,
      email: signUpDto.email,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
    };

    const user: any = await this.userService.create(userPayload);

    const token = this.jwt.sign({
      email: user.email,
      sub: user.userId,
    });

    return {
      meta: {
        code: 200,
        success: true,
        token,
      },
      data: {
        ...user.toObject(),
        auth: {
          email: auth.email,
        },
      },
    };
  }

  /**
   * @param {token} token: token gotten from payload
   * @return {Object} returns an access token
   */
  async verify(token: string): Promise<User> {
    const decoded = this.jwt.verify(token, {
      secret: jwtSecret,
    });
    return await this.userService.getUserByEmail(decoded.email);
  }

  public async getAuths(): Promise<Auth[]> {
    return this.authModel.find();
  }
}
