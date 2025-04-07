export interface IConfigService {
  databaseConfig: string;
  tokenConfig: {
    secret: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
  };
  get(key: string): string | undefined;
}
