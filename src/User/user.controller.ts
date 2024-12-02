import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.model';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

import { Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  // User registration route
  @Post()
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }


  @UseGuards(LocalAuthGuard)  
  @Post('auth/login')  
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user.dataValues); 
  }

  // Logout route (using passport.js logout)
  @UseGuards(JwtAuthGuard) // Ensure logout requires an authenticated user
  @Post('auth/logout')
  async logout(@Request() req) {
    req.logout();
    return { message: 'Logout successful' };
  }

  // Get user by ID route (protected by JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param("id") id: number,@Request() req): Promise<User> {
    console.log(req.user)
    return await this.userService.getOneUser(id,req.user.id);
  }

  // Get all users route (only accessible by users with 'admin' role)
  @UseGuards(JwtAuthGuard, RolesGuard)  // Ensure JWT and Roles guards are applied
  @Roles('admin')
  @Get()
  async getUsers(@Request() req): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  // Update user information (only accessible by authenticated users)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  // Delete user route (only accessible by authenticated users)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
