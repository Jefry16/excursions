import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';

@Controller('users')
// @Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('/who')
  whoAmI(@CurrentUser() data: any) {
    return data;
  }

  @UseGuards(LoggedinGuard)
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findOneById(parseInt(id));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }
}
