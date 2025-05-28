import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private usersModel: Model <UsersDocument> ){}

  create(createUserDto: CreateUserDto) {
      const createdUser = this.usersModel(createUserDto);
      return createdUser.save();
  }

  async findAll(): Promise<User[] | null> {
    return this.usersModel.find().lean.exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Partial<UpdateUserDto> : Promise<User | null>) {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto, {new : true}).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
