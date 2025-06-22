import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

@Injectable()
export class DatabaseService {
  public db: ReturnType<typeof drizzle>;

  constructor(private configService: ConfigService) {
    const client = createClient({
      url: this.configService.get<string>('TURSO_DATABASE_URL')!,
      authToken: this.configService.get<string>('TURSO_AUTH_TOKEN')!,
    });

    this.db = drizzle(client, { schema });
  }
}