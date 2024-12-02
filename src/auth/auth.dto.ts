import { IsString, IsEmail, IsNotEmpty, Matches, Length, IsOptional, IsArray } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters long.' })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message: 'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    },
  )
  password: string;

  @IsArray()
  @IsOptional()
  roles: string[] = []; 
}