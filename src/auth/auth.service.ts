import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../User/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getOneByEmail(email);
    const check=await bcrypt.compare(pass, user.password)
    if (user && check ) {
      const { password, ...result } = user;
      return result;  
    }
    return null;
  }

  // Generate JWT token after successful login
  async login(user: any) {

    const payload = { email: user.email, id: user.id, role: user.role };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),  // Return the generated JWT
    };
  }
}
