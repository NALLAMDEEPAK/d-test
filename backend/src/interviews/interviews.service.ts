import { Injectable } from '@nestjs/common';
import { eq, and, or } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { interviews, users, type Interview, type NewInterview } from '../database/schema';
import { v4 as uuidv4 } from 'uuid';

export interface CreateInterviewDto {
  title: string;
  participantEmail: string;
  participantName?: string;
  scheduledAt: string;
  durationMinutes: number;
  description?: string;
  topics?: string[];
}

@Injectable()
export class InterviewsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(interviewerId: string, createDto: CreateInterviewDto): Promise<Interview> {
    const db = this.databaseService.db;

    const newInterview: NewInterview = {
      id: uuidv4(),
      title: createDto.title,
      interviewerId,
      participantEmail: createDto.participantEmail,
      participantName: createDto.participantName,
      scheduledAt: createDto.scheduledAt,
      durationMinutes: createDto.durationMinutes,
      description: createDto.description,
      topics: createDto.topics ? JSON.stringify(createDto.topics) : null,
      status: 'pending',
      isIncoming: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.insert(interviews).values(newInterview).returning();
    return this.formatInterview(result[0]);
  }

  async findByUserId(userId: string): Promise<Interview[]> {
    const db = this.databaseService.db;

    // Get user's email to find incoming interviews
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const userEmail = user[0]?.email;

    const result = await db
      .select()
      .from(interviews)
      .where(
        or(
          eq(interviews.interviewerId, userId),
          eq(interviews.participantId, userId),
          userEmail ? eq(interviews.participantEmail, userEmail) : undefined
        )
      );

    return result.map(interview => this.formatInterview(interview));
  }

  async findById(id: string): Promise<Interview | null> {
    const db = this.databaseService.db;

    const result = await db
      .select()
      .from(interviews)
      .where(eq(interviews.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return this.formatInterview(result[0]);
  }

  async updateStatus(id: string, status: string, userId?: string): Promise<Interview | null> {
    const db = this.databaseService.db;

    const updateData: any = {
      status,
      updatedAt: new Date().toISOString(),
    };

    // If accepting an interview, set the participant ID
    if (status === 'accepted' && userId) {
      updateData.participantId = userId;
    }

    const result = await db
      .update(interviews)
      .set(updateData)
      .where(eq(interviews.id, id))
      .returning();

    if (result.length === 0) {
      return null;
    }

    return this.formatInterview(result[0]);
  }

  private formatInterview(interview: any): Interview {
    return {
      ...interview,
      topics: interview.topics ? JSON.parse(interview.topics) : [],
      isIncoming: Boolean(interview.isIncoming),
    };
  }
}