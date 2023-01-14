export class AccessTokenDto {
  readonly accessToken: string;
}

export class SignupResponseDto {
  readonly message: string;
}

export class SigninResponseDto {
  readonly message: string;
  readonly id: number;
  readonly accessToken: string;
}

export class UserFindResponseDto {
  readonly message: string;
  readonly email: string;
  readonly nickname: string;
}
