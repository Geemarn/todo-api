import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform((s) => String(s.value).trim().toLowerCase())
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Transform((s) => String(s.value).trim())
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}
