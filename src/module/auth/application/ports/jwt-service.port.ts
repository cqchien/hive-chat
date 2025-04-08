export interface IJwtService {
  signAccessToken(payload: Record<string, unknown>): Promise<{
    accessToken: string;
    expiresIn: number;
  }>;
  signRefreshToken(payload: Record<string, unknown>): Promise<{
    refreshToken: string;
    expiresIn: number;
  }>;
}
