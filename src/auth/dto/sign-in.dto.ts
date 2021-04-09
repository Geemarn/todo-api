import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @Transform((s) => String(s.value).trim().toLowerCase())
  readonly email: string;

  @IsString()
  @Transform((s) => String(s.value).trim())
  readonly password: string;
}
