import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export enum AuthExceptionStatus {
  AUTH_DATA_NOT_FOUND,
  BASIC_AUTH_INVALID_TOKEN,
  BASIC_AUTH_ACCOUNT_VERIFIED,
}

export class ErrorException extends HttpException {
  constructor(error: any, status: number, code = -1, message: string = null) {
    const customMsg = typeof error === 'string' ? error : message;
    super(customMsg, status);
  }

  public static ERROR(message, code?: HttpStatus) {
    return new this(message, code || HttpStatus.FAILED_DEPENDENCY, -1);
  }

  public static get USER_CREATION_ERROR() {
    return new this(
      'User cannot be created at the moment, pls try again later',
      HttpStatus.FAILED_DEPENDENCY,
      -1,
    );
  }

  public static get ACCOUNT_NOT_FOUND() {
    return new this(
      'User not found',
      HttpStatus.UNAUTHORIZED,
      AuthExceptionStatus.AUTH_DATA_NOT_FOUND,
    );
  }

  public static get INVALID_CREDENTIAL() {
    return new this(
      'Email or password is not correct',
      HttpStatus.UNAUTHORIZED,
      AuthExceptionStatus.AUTH_DATA_NOT_FOUND,
    );
  }

  public static get USER_EXIST() {
    return new this(
      'User already exist',
      HttpStatus.CONFLICT,
      AuthExceptionStatus.AUTH_DATA_NOT_FOUND,
    );
  }

  public static get INVALID_TOKEN() {
    return new this(
      'Verification token is invalid',
      HttpStatus.UNAUTHORIZED,
      AuthExceptionStatus.BASIC_AUTH_INVALID_TOKEN,
    );
  }

  public static get TOKEN_EXPIRED() {
    return new this(
      'Verification token has expired',
      HttpStatus.FORBIDDEN,
      AuthExceptionStatus.BASIC_AUTH_ACCOUNT_VERIFIED,
    );
  }

  public static get AUTHENTICATION_FAILED() {
    return new this(
      'Authentication Failed! Wrong email or password',
      HttpStatus.UNAUTHORIZED,
      AuthExceptionStatus.AUTH_DATA_NOT_FOUND,
    );
  }
}
