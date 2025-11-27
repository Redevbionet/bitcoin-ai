export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CONSOLE = 'CONSOLE',
  AI_ANALYST = 'AI_ANALYST',
  LICENSE = 'LICENSE',
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';
  logger: string;
  message: string;
}

export interface NetworkStat {
  time: string;
  connections: number;
  hashrate: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface RpcCommand {
  method: string;
  params?: any[];
}