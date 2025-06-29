export interface IChatGateway {
  handleConnection(clientId: string): Promise<void>;
  handleDisconnect(clientId: string): Promise<void>;
}
