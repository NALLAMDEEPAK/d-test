import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = []; // In-memory store for demo

  async createOrUpdateUser(userData: Partial<User>): Promise<User> {
    const existingUserIndex = this.users.findIndex(
      user => user.googleId === userData.googleId
    );

    if (existingUserIndex >= 0) {
      // Update existing user
      this.users[existingUserIndex] = {
        ...this.users[existingUserIndex],
        ...userData,
        updatedAt: new Date(),
      };
      return this.users[existingUserIndex];
    } else {
      // Create new user
      const newUser: User = {
        id: this.generateId(),
        googleId: userData.googleId,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.push(newUser);
      return newUser;
    }
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.users.find(user => user.googleId === googleId) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}