import React from 'react';
import { LayoutDashboard, Terminal, BrainCircuit, Scale } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  isNodeOnline: boolean;
  blockHeight: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isNodeOnline, blockHeight }) => {
  const navItems = [
    { view: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { view: ViewState.CONSOLE, label: 'RPC Console', icon: Terminal },
    { view: ViewState.AI_ANALYST, label: 'AI Analyst', icon: BrainCircuit },
    { view: ViewState.LICENSE, label: 'Legal / License', icon: Scale },
  ];

  return (
    <aside className="w-64 bg-bitcoin-panel border-r border-bitcoin-border flex flex-col shadow-xl z-20">
      <div className="p-6 flex items-center space-x-3 border-b border-bitcoin-border/50">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/5968/5968260.png" 
          alt="Bitcoin AI Logo" 
          className="w-8 h-8"
        />
        <h1 className="text-xl font-bold text-gray-100 tracking-tight">Bitcoin AI</h1>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.view
                ? 'bg-bitcoin-orange/10 text-bitcoin-orange border border-bitcoin-orange/20'
                : 'text-gray-400 hover:bg-bitcoin-border/50 hover:text-gray-200'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-bitcoin-border/50">
        <div className={`border rounded-lg p-3 flex items-center space-x-3 transition-all duration-300 ${
            isNodeOnline 
              ? 'bg-green-500/5 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.05)]' 
              : 'bg-red-500/5 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.05)]'
          }`}>
          
          <div className="relative flex-shrink-0">
             <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                isNodeOnline ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <div className={`absolute top-0 left-0 w-2.5 h-2.5 rounded-full animate-ping opacity-75 ${
                isNodeOnline ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
          </div>

          <div className="flex-1 min-w-0">
            <p className={`text-xs font-bold uppercase tracking-wider truncate ${
              isNodeOnline ? 'text-green-400' : 'text-red-400'
            }`}>
              {isNodeOnline ? 'Online' : 'Offline'}
            </p>
            <div className="text-[10px] text-gray-500 mt-0.5 font-mono flex items-center gap-1">
              <span className="opacity-70">Height:</span>
              <span className={`truncate ${isNodeOnline ? 'text-gray-300' : 'text-red-500/50'}`}>
                {isNodeOnline ? blockHeight.toLocaleString() : '---'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};