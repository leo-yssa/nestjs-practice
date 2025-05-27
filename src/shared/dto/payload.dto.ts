import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { USER_TYPE, UserType } from '@shared/type/user.type';
import { TOKEN_TYPE, TokenType } from '@shared/type/token.type';
export class PayloadDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(USER_TYPE)
  userType: UserType;

  @IsNotEmpty()
  @IsEnum(TOKEN_TYPE)
  tokenType: TokenType;
}
