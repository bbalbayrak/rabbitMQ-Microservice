import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class orderDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsPositive()
  price: number;
  @IsPhoneNumber()
  phoneNumber: string;
}
