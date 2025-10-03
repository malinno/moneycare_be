/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: any) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) return { message: 'User not found' };
    return { id: user._id, username: user.username };
  }

  @Put('me')
  async updateMe(@Req() req: any, @Body() dto: UpdateUserDto) {
    const updated = await this.usersService.updateUser(req.user.userId, dto);
    if (!updated) return { message: 'User not found' };
    return { id: updated._id, username: updated.username };
  }
}
