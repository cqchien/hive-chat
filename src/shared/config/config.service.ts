import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { IConfigService } from './config.interface';

@Injectable()
export class ConfigService implements IConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get databaseConfig(): string {
    return (
      `mongodb://${this.getString('DB_USERNAME')}:` +
      `${this.getString('DB_PASSWORD')}@${this.getString('DB_HOST')}:` +
      `${this.getNumber('DB_PORT')}/${this.get('DB_DATABASE')}?authSource=admin`
    );
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value ? value.replaceAll(String.raw`\n`, '\n') : '';
  }

  get(key: string): string | undefined {
    return this.configService.get<string>(key);
  }
}
