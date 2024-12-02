import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { User } from 'src/User/user.model';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @Post('login')
    async login(@Body() login:LoginDto)
    {
     return await this.authService.login(login);
    }
}
