import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty()
  user: string;
  @ApiProperty({ description: 'json web token' })
  jwt: string;
  @ApiProperty({ description: 'in seconds' })
  expiresIn: number;
}

export interface AuthDataDto {
  LOGIN: string;
  HASLO: string;
  E_MAIL: string;
  IMIE: string;
  NAZWISKO: string;
  PRACOWNICY_ID: number;
  LC_WYDZIALY_ID: number;
  LC_WYDZIALY_OPIS: string;
  MAGAZYNY_ID: number;
}

export interface UserDataDto {
  LOGIN: string;
  E_MAIL: string;
  PRACOWNICY_ID: number;
  LC_WYDZIALY_ID: number;
  MAGAZYNY_ID: number;
}

export class ResetPasswordResponseDto {
  @ApiProperty()
  Message: string;
  @ApiProperty()
  HASLO: string;
}