import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  nickname: string;
}

export class SigninRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  password: string;
}
