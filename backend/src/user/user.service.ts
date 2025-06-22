import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { users, type User, type NewUser } from '../database/schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createOrUpdateUser(userData: Partial<NewUser>): Promise<User> {
    const db = this.databaseService.db;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.googleId, userData.googleId!))
      .limit(1);

    if (existingUser.length > 0) {
      // Update existing user
      const updatedUser = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(users.googleId, userData.googleId!))
        .returning();

      return updatedUser[0];
    } else {
      // Create new user
      const newUser: NewUser = {
        id: uuidv4(),
        googleId: userData.googleId!,
        email: userData.email!,
        name: userData.name!,
        picture: userData.picture,
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const createdUser = await db.insert(users).values(newUser).returning();
      return createdUser[0];
    }
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const db = this.databaseService.db;
    
    const result = await db
      .select()
      .from(users)
      .where(eq(users.googleId, googleId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  async findById(id: string): Promise<User | null> {
    const db = this.databaseService.db;
    
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const db = this.databaseService.db;
    
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }
}