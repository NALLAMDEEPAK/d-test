import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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

  async validateUser(payload: any): Promise<User> {
    const user = await this.userService.findByGoogleId(payload.googleId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}