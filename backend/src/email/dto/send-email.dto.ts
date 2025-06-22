import { IsEmail, IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsObject()
  interviewDetails?: {
    date?: string;
    time?: string;
    duration?: number;
    topics?: string;
    description?: string;
  };
}