import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';
import { analyzeLogEntry } from '../services/geminiService';

interface ConsoleLog {
  id: number;
  type: 'input' | 'output' | 'system';
  content: string;
  timestamp: string;
  analysis?: string;
}

export const RpcConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<ConsoleLog[]>([
    {
      id: 0,
      type: 'system',
      content: 'Bitcoin Core RPC client version v24.0.1 initialized.',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 1,
      type: 'system',
      content: 'Type "help" for a list of commands.',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const newLogId = logs.length + 1;
    
    const inputLog: ConsoleLog = {
      id: newLogId,
      type: 'input',
      content: `> ${cmd}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    setLogs(prev => [...prev, inputLog]);
    setInput('');

    // Simulate RPC Response
    setTimeout(() => {
      let response = '';
      if (cmd === 'help') {
        response = `
== Blockchain ==
getbestblockhash
getblock "blockhash" ( verbosity )
getblockchaininfo
getblockcount

== Network ==
getnetworkinfo
getpeerinfo
getconnectioncount
`;
      } else if (cmd === 'getnetworkinfo') {
        response = JSON.stringify({
          version: 240001,
          subversion: "/Satoshi:24.0.1/",
          protocolversion: 70016,
          localservices: "0000000000000409",
          localrelay: true,
          timeoffset: 0,
          networkactive: true,
          connections: 12,
          connections_in: 4,
          connections_out: 8,
          warnings: ""
        }, null, 2);
      } else if (cmd === 'getconnectioncount') {
          response = "12";
      } else {
        response = `(error) Method not found: ${cmd}`;
      }

      setLogs(prev => [...prev, {
        id: newLogId + 1,
        type: 'output',
        content: response,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }, 400);
  };

  const handleAnalyze = async (log: ConsoleLog) => {
    if (log.type === 'input') return;
    setAnalyzingId(log.id);
    const explanation = await analyzeLogEntry(log.content);
    
    setLogs(prev => prev.map(l => {
      if (l.id === log.id) {
        return { ...l, analysis: explanation };
      }
      return l;
    }));
    setAnalyzingId(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-black rounded-xl border border-bitcoin-border overflow-hidden font-mono text-sm shadow-2xl">
      <div className="bg-bitcoin-panel border-b border-bitcoin-border p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Terminal size={16} className="text-gray-400" />
            <span className="text-gray-300 font-semibold">RPC Terminal (127.0.0.1:8332)</span>
        </div>
        <button onClick={() => setLogs([])} className="text-gray-500 hover:text-white transition">
            <RotateCcw size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="group">
            <div className="flex items-start gap-3">
              <span className="text-gray-600 text-xs mt-1 select-none w-20 text-right">{log.timestamp}</span>
              <div className="flex-1">
                <pre className={`whitespace-pre-wrap ${
                  log.type === 'input' ? 'text-bitcoin-orange font-bold' : 
                  log.type === 'system' ? 'text-blue-400' : 'text-green-400'
                }`}>
                  {log.content}
                </pre>
                
                {log.analysis && (
                   <div className="mt-2 p-3 bg-bitcoin-panel/50 border-l-2 border-purple-500 text-gray-300 text-xs italic">
                     <span className="text-purple-400 font-bold not-italic">AI Insight: </span>
                     {log.analysis}
                   </div>
                )}
              </div>
              
              {log.type === 'output' && !log.analysis && (
                  <button 
                    onClick={() => handleAnalyze(log)}
                    disabled={analyzingId === log.id}
                    className="opacity-0 group-hover:opacity-100 text-purple-400 hover:text-purple-300 text-xs border border-purple-500/30 rounded px-2 py-1 transition-all"
                  >
                    {analyzingId === log.id ? 'Thinking...' : 'Analyze'}
                  </button>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-bitcoin-panel border-t border-bitcoin-border">
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-bitcoin-orange font-bold text-lg select-none">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-600"
            placeholder="Enter RPC command (e.g. getnetworkinfo, help)..."
            autoFocus
          />
          <button 
            type="submit" 
            className="bg-bitcoin-orange text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2 text-xs font-bold uppercase"
          >
            <Play size={12} fill="currentColor" /> Run
          </button>
        </form>
      </div>
    </div>
  );
};