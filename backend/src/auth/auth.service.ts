import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async googleLogin(googleUser: any) {
    if (!googleUser) {
      throw new UnauthorizedException('No user from Google');
    }

    // Create or update user in our system
    const user = await this.userService.createOrUpdateUser({
      googleId: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      accessToken: googleUser.accessToken,
      refreshToken: googleUser.refreshToken,
    });

    // Generate JWT token
    const payload = { 
      sub: user.id, 
      email: user.email,
      googleId: user.googleId,
    };
    
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    };
  }

  async verifyGoogleCredential(credential: string) {
    try {
      // Verify the Google ID token
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
      );
      
      if (!response.ok) {
        throw new UnauthorizedException('Invalid Google credential');
      }
      
      const payload = await response.json();
      
      // Verify the audience (client ID)
      const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
      if (payload.aud !== clientId) {
        throw new UnauthorizedException('Invalid audience');
      }
      
      // Create or update user in our system
      const user = await this.userService.createOrUpdateUser({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      });

      // Generate JWT token
      const jwtPayload = { 
        sub: user.id, 
        email: user.email,
        googleId: user.googleId,
      };
      
      const access_token = this.jwtService.sign(jwtPayload);

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
        },
      };
    } catch (error) {
      console.error('Google credential verification error:', error);
      throw new UnauthorizedException('Failed to verify Google credential');
    }
  }

  async validateUser(payload: any): Promise<User> {
    const user = await this.userService.findByGoogleId(payload.googleId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}