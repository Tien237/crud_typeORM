import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './userDTO';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async index() {
    const userDTO = new UserDTO();
    userDTO.age = 12;
    userDTO.email = 'abv';
    userDTO.name = 'Abc';
    userDTO.status = true;

    await this.userService.create(userDTO);

    const users = await this.userService.getAll();
    return { message: 'Lấy dữ liệu xong', users };
  }
}
