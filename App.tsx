import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { RpcConsole } from './components/RpcConsole';
import { AiAnalyst } from './components/AiAnalyst';
import { LicenseView } from './components/LicenseView';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isNodeOnline, setIsNodeOnline] = useState<boolean>(true);
  const [blockHeight, setBlockHeight] = useState<number>(834102);

  useEffect(() => {
    const fetchNodeData = async () => {
      try {
        // Mocking the RPC Call behavior
        // In a real application, this would be: 
        // const info = await rpc.call('getnetworkinfo');
        // const height = await rpc.call('getblockcount');
        
        // Simulate network latency (300-800ms)
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

        // Simulate occasional connection failure (15% chance) to demonstrate error handling
        const connectionSim = Math.random();
        if (connectionSim > 0.85) {
          throw new Error("Connection refused: Bitcoin Core RPC not reachable");
        }

        // If we reach here, 'getnetworkinfo' was successful
        setIsNodeOnline(true);

        // Update block height (simulating 'getblockcount')
        // We randomly increment it to simulate finding new blocks
        setBlockHeight(prev => prev + (Math.random() > 0.9 ? 1 : 0));

      } catch (error) {
        // Handle connection errors gracefully
        console.warn("Node Status Check Failed:", error);
        setIsNodeOnline(false);
      }
    };

    // Initial fetch
    fetchNodeData();

    // Poll every 10 seconds
    const intervalId = setInterval(fetchNodeData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.CONSOLE:
        return <RpcConsole />;
      case ViewState.AI_ANALYST:
        return <AiAnalyst />;
      case ViewState.LICENSE:
        return <LicenseView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bitcoin-dark text-gray-200">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isNodeOnline={isNodeOnline}
        blockHeight={blockHeight}
      />
      <main className="flex-1 overflow-auto p-6 relative">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;