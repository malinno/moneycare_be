import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  username: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  confirmPassword: string;
}
