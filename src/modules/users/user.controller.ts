/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: any) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      return { message: 'User not found' }; // hoặc throw new NotFoundException()
    }
    return { id: user._id, username: user.username };
  }

  @Put('me')
  async updateMe(
    @Req() req: any,
    @Body() body: { username?: string; password?: string },
  ) {
    return this.usersService.updateUser(req.user.userId, body);
  }
}
