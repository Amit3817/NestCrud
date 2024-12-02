import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
      ) {}

  async createUser(user:CreateUserDto): Promise<User> {
    const old=await this.userModel.findOne({ where: { email:user.email } });
    if(old) throw new ConflictException('Email already in use');
    user.password=await bcrypt.hash(user.password,10);
    return await this.userModel.create(user);   
  }

  async getOneUser(id:number,tokenId:number): Promise<User> {
    const user=await this.userModel.findByPk(id);
    if(!user) throw new NotFoundException(`User with id ${id} not found`);
    console.log(tokenId)
    if(user.id===tokenId)
    return user;
  else
  throw new UnauthorizedException();    
  }
  async getOneByEmail(email:string): Promise<User> {
    const user=await this.userModel.findOne({where:{email:email}});
    if(!user) throw new NotFoundException(`User with id ${email} not found`);
    return user;   
  }

  async getAllUser(): Promise<User[]> {
    const users=await this.userModel.findAll();
    if(!users||users.length===0) throw new NotFoundException(`No User Found`);
    return users;   
  }

  async updateUser(id:number,user:UpdateUserDto): Promise<User> {
    const old=await this.userModel.findByPk(id);
    if(!old) throw new NotFoundException(`No User Found for email ${user.email}`);
    if(user.password) user.password=await bcrypt.hash(user.password,10)
    await old.update(user);
    return old;
  }

  async deleteUser(id:number):Promise<void>
  {
    const user=await this.userModel.findByPk(id);
    if(!user) throw new NotFoundException(`No User Found for id ${id}`);
    await user.destroy();
    return;
  }
}
