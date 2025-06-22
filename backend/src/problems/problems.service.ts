import { Injectable } from '@nestjs/common';
import { eq, like, and, or } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { problems, type Problem } from '../database/schema';

@Injectable()
export class ProblemsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(filters?: {
    difficulty?: string;
    topic?: string;
    search?: string;
  }): Promise<Problem[]> {
    const db = this.databaseService.db;
    let query = db.select().from(problems);

    const conditions = [];

    if (filters?.difficulty) {
      conditions.push(eq(problems.difficulty, filters.difficulty));
    }

    if (filters?.topic) {
      conditions.push(like(problems.topics, `%"${filters.topic}"%`));
    }

    if (filters?.search) {
      conditions.push(
        or(
          like(problems.title, `%${filters.search}%`),
          like(problems.description, `%${filters.search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query;
    
    // Parse JSON fields
    return result.map(problem => ({
      ...problem,
      topics: JSON.parse(problem.topics || '[]'),
      examples: problem.examples ? JSON.parse(problem.examples) : [],
      constraints: problem.constraints ? JSON.parse(problem.constraints) : [],
    }));
  }

  async findById(id: string): Promise<Problem | null> {
    const db = this.databaseService.db;
    
    const result = await db
      .select()
      .from(problems)
      .where(eq(problems.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const problem = result[0];
    
    // Parse JSON fields
    return {
      ...problem,
      topics: JSON.parse(problem.topics || '[]'),
      examples: problem.examples ? JSON.parse(problem.examples) : [],
      constraints: problem.constraints ? JSON.parse(problem.constraints) : [],
    };
  }

  async getTopics(): Promise<string[]> {
    const db = this.databaseService.db;
    
    const result = await db.select({ topics: problems.topics }).from(problems);
    
    const allTopics = new Set<string>();
    result.forEach(row => {
      const topics = JSON.parse(row.topics || '[]');
      topics.forEach((topic: string) => allTopics.add(topic));
    });

    return Array.from(allTopics).sort();
  }

  async getByTopic(topic: string): Promise<Problem[]> {
    return this.findAll({ topic });
  }
}