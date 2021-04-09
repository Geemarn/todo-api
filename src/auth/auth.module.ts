import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthSchema } from './entity/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './auth.strategy';
import { UserService } from '../user/service/user.service';
import { jwtSecret } from '../_shared/constant';
import { UserSchema } from 'src/user/entity/user.entity';

@Module({
  imports: [
    HttpModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Auth', schema: AuthSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'auth',
    }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService, AuthStrategy],
})
export class AuthModule {}
