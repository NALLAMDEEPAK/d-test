import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProblemsService } from './problems.service';

@Controller('problems')
@UseGuards(JwtAuthGuard)
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  async findAll(
    @Query('difficulty') difficulty?: string,
    @Query('topic') topic?: string,
    @Query('search') search?: string,
  ) {
    const problems = await this.problemsService.findAll({
      difficulty,
      topic,
      search,
    });

    return {
      success: true,
      problems,
    };
  }

  @Get('topics')
  async getTopics() {
    const topics = await this.problemsService.getTopics();
    
    return {
      success: true,
      topics,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const problem = await this.problemsService.findById(id);
    
    if (!problem) {
      return {
        success: false,
        message: 'Problem not found',
      };
    }

    return {
      success: true,
      problem,
    };
  }

  @Get('topic/:topic')
  async getByTopic(@Param('topic') topic: string) {
    const problems = await this.problemsService.getByTopic(decodeURIComponent(topic));
    
    return {
      success: true,
      problems,
    };
  }
}