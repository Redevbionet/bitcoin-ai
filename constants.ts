import { NetworkStat } from './types';

export const BITCOIN_LOGO_URL = "https://www.flaticon.com/free-icon/bitcoin_5968260";
export const MOCK_NETWORK_DATA: NetworkStat[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  connections: Math.floor(Math.random() * (12 - 8 + 1) + 8),
  hashrate: Math.floor(Math.random() * (450 - 380 + 1) + 380), // Exahashes
}));

export const INITIAL_LOGS = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 10000).toISOString(),
    level: 'INFO',
    logger: 'BitcoinRPC',
    message: 'Bitcoin Core RPC server started',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 8000).toISOString(),
    level: 'DEBUG',
    logger: 'BitcoinRPC',
    message: 'Loading block index...',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 5000).toISOString(),
    level: 'INFO',
    logger: 'BitcoinRPC',
    message: 'init message: Verifying blocks...',
  },
];
