import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  googleId: text('google_id').unique().notNull(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  picture: text('picture'),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const problems = sqliteTable('problems', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  difficulty: text('difficulty').notNull(), // 'Easy', 'Medium', 'Hard'
  topics: text('topics').notNull(), // JSON string array
  description: text('description').notNull(),
  youtubeUrl: text('youtube_url'),
  externalUrl: text('external_url'),
  starterCode: text('starter_code'),
  solutionCode: text('solution_code'),
  solutionExplanation: text('solution_explanation'),
  timeComplexity: text('time_complexity'),
  spaceComplexity: text('space_complexity'),
  examples: text('examples'), // JSON string
  constraints: text('constraints'), // JSON string array
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const interviews = sqliteTable('interviews', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  interviewerId: text('interviewer_id').notNull().references(() => users.id),
  participantId: text('participant_id').references(() => users.id),
  participantEmail: text('participant_email'),
  participantName: text('participant_name'),
  scheduledAt: text('scheduled_at').notNull(),
  durationMinutes: integer('duration_minutes').notNull().default(60),
  description: text('description'),
  topics: text('topics'), // JSON string array
  status: text('status').notNull().default('pending'), // 'pending', 'accepted', 'completed', 'cancelled'
  isIncoming: integer('is_incoming', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  interviewId: text('interview_id').notNull().references(() => interviews.id),
  senderId: text('sender_id').notNull().references(() => users.id),
  senderType: text('sender_type').notNull(), // 'user', 'interviewer'
  text: text('text').notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
});

export const userProgress = sqliteTable('user_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  problemId: text('problem_id').notNull().references(() => problems.id),
  status: text('status').notNull(), // 'attempted', 'solved', 'reviewed'
  attempts: integer('attempts').notNull().default(0),
  lastAttemptAt: text('last_attempt_at').default(sql`CURRENT_TIMESTAMP`),
  solutionCode: text('solution_code'),
  timeSpent: integer('time_spent').default(0), // in seconds
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Problem = typeof problems.$inferSelect;
export type NewProblem = typeof problems.$inferInsert;
export type Interview = typeof interviews.$inferSelect;
export type NewInterview = typeof interviews.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;