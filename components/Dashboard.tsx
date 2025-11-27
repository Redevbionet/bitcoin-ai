import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Network, Zap, Cpu } from 'lucide-react';
import { MOCK_NETWORK_DATA } from '../constants';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; sub: string }> = ({ title, value, icon, sub }) => (
  <div className="bg-bitcoin-panel border border-bitcoin-border rounded-xl p-5 shadow-sm hover:border-bitcoin-orange/30 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-100 mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-bitcoin-border rounded-lg text-bitcoin-orange">
        {icon}
      </div>
    </div>
    <p className="text-xs text-gray-500 font-mono">{sub}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Network Overview</h2>
        <span className="text-xs bg-bitcoin-orange/10 text-bitcoin-orange px-3 py-1 rounded-full border border-bitcoin-orange/20">
          Mainnet
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Connections" 
          value="12" 
          icon={<Network size={20} />} 
          sub="IN: 4 / OUT: 8"
        />
        <StatCard 
          title="Network Hashrate" 
          value="582 EH/s" 
          icon={<Cpu size={20} />} 
          sub="+2.4% last 24h"
        />
        <StatCard 
          title="Mempool Size" 
          value="45 MB" 
          icon={<Activity size={20} />} 
          sub="~12,000 txs pending"
        />
        <StatCard 
          title="Block Height" 
          value="834,102" 
          icon={<Zap size={20} />} 
          sub="Latest: 2 mins ago"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bitcoin-panel border border-bitcoin-border rounded-xl p-6 h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Connection History</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={MOCK_NETWORK_DATA}>
              <defs>
                <linearGradient id="colorConn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F7931A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2E33" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} domain={[0, 20]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1b1e', border: '1px solid #2C2E33', borderRadius: '8px' }}
                itemStyle={{ color: '#F7931A' }}
              />
              <Area 
                type="monotone" 
                dataKey="connections" 
                stroke="#F7931A" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorConn)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-bitcoin-panel border border-bitcoin-border rounded-xl p-6 h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Hashrate Dist (Mock)</h3>
           <ResponsiveContainer width="100%" height="85%">
            <BarChart data={MOCK_NETWORK_DATA.slice(0, 7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2E33" vertical={false} />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} />
              <Tooltip 
                cursor={{fill: '#2C2E33', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#1a1b1e', border: '1px solid #2C2E33', borderRadius: '8px' }}
              />
              <Bar dataKey="hashrate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};