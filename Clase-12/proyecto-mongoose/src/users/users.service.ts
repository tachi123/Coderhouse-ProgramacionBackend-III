import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private usersModel: Model <UsersDocument> ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save(); // save() ya devuelve una promesa
  }

  async findAll(): Promise<User[] | null> {
    return this.usersModel.find().lean().exec();
  }

  async findOne(id: string): Promise<User | null> { // id: string
    return this.usersModel.findById(id).lean().exec(); // lean() y exec()
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<User | null> { // Partial en el parámetro
    return this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true }).lean().exec(); // lean() y exec()
  }

  async remove(id: string): Promise<User | null> { // id: string
    return this.usersModel.findByIdAndDelete(id).lean().exec(); // lean() y exec()

  }
}
