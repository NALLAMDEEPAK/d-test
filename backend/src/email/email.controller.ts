import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/interfaces/user.interface';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-invite')
  @UseGuards(JwtAuthGuard)
  async sendInvite(@GetUser() user: User, @Body() sendEmailDto: SendEmailDto) {
    return await this.emailService.sendInviteEmail(user, sendEmailDto);
  }
}