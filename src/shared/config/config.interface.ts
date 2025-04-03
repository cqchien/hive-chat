export interface IConfigService {
  databaseConfig: string;
  get(key: string): string | undefined;
}
