import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { throwError } from 'rxjs';

@Controller('users') //Las rutas comienzan con /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('limit') limit) { //@Query('parametro') aliasOVariable
    const users = this.usersService.findAll();
    return { status: 'success', users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    if(isNaN(+id)) throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST);

    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post('/:id')
  create(@Request() req) {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    return ".....";
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
