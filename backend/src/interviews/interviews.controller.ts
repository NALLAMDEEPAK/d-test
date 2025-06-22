import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/interfaces/user.interface';
import { InterviewsService, CreateInterviewDto } from './interviews.service';

@Controller('interviews')
@UseGuards(JwtAuthGuard)
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  async create(@GetUser() user: User, @Body() createDto: CreateInterviewDto) {
    const interview = await this.interviewsService.create(user.id, createDto);
    
    return {
      success: true,
      interview,
    };
  }

  @Get()
  async findByUser(@GetUser() user: User) {
    const interviews = await this.interviewsService.findByUserId(user.id);
    
    return {
      success: true,
      interviews,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const interview = await this.interviewsService.findById(id);
    
    if (!interview) {
      return {
        success: false,
        message: 'Interview not found',
      };
    }

    return {
      success: true,
      interview,
    };
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
    @GetUser() user: User,
  ) {
    const interview = await this.interviewsService.updateStatus(
      id,
      body.status,
      user.id,
    );
    
    if (!interview) {
      return {
        success: false,
        message: 'Interview not found',
      };
    }

    return {
      success: true,
      interview,
    };
  }
}