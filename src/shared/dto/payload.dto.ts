import { IsNotEmpty, IsString, Length } from 'class-validator';
export class PayloadDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 10, {
    message: 'overflow type length',
  })
  type: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 10, {
    message: 'overflow token type length',
  })
  tokenType: string;
}
