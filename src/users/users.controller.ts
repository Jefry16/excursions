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
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';

@Controller('auth')
// @Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('/who')
  whoAmI(@CurrentUser() data: any) {
    return data;
  }
  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto) {
    const user = await this.authService.signin(body.email, body.password);
    return user;
  }
  @UseGuards(LoggedinGuard)
  @Post('signout')
  signout() {}

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
