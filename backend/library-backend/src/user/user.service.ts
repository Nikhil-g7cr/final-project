import { ConflictException, Injectable } from '@nestjs/common';
import {LoginDto, RegisterDTO} from '../auth/dto/registerUser.dto'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDTO: RegisterDTO): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: registerUserDTO.email,
    });
    if (existingUser) {
      throw new ConflictException('User Already Exists');
    }
    const createdUser = new this.userModel(registerUserDTO);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User[]> {
    return this.userModel.find({email});
  }

  async getUserByEmail(email:string){
    return await this.userModel.findOne({email:email})
  }
}
