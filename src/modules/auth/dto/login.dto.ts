import { IsString } from 'class-validator';

export class LoginDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  username: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  password: string;
}
