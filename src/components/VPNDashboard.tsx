
import React, { useState, useEffect } from 'react';
import { Shield, Power, Zap, Globe, Activity, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConnectionStatus from './ConnectionStatus';
import ServerSelector from './ServerSelector';
import SecurityPanel from './SecurityPanel';
import StatsPanel from './StatsPanel';

export interface VPNStatus {
  connected: boolean;
  server: string | null;
  location: string | null;
  encryption: string;
  killSwitch: boolean;
  uptime: number;
  downloadSpeed: string;
  uploadSpeed: string;
  dataTransferred: string;
}

const VPNDashboard = () => {
  const [vpnStatus, setVpnStatus] = useState<VPNStatus>({
    connected: false,
    server: null,
    location: null,
    encryption: 'AES-256',
    killSwitch: true,
    uptime: 0,
    downloadSpeed: '0 Mbps',
    uploadSpeed: '0 Mbps',
    dataTransferred: '0 GB'
  });

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setVpnStatus(prev => ({
      ...prev,
      connected: !prev.connected,
      server: !prev.connected ? 'peer-node-001.p2p' : null,
      location: !prev.connected ? 'Distributed Network' : null,
      downloadSpeed: !prev.connected ? '125.3 Mbps' : '0 Mbps',
      uploadSpeed: !prev.connected ? '89.7 Mbps' : '0 Mbps',
      dataTransferred: !prev.connected ? '2.4 GB' : '0 GB'
    }));
    
    setIsConnecting(false);
  };

  const toggleKillSwitch = () => {
    setVpnStatus(prev => ({
      ...prev,
      killSwitch: !prev.killSwitch
    }));
  };

  // Update uptime when connected
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (vpnStatus.connected) {
      interval = setInterval(() => {
        setVpnStatus(prev => ({
          ...prev,
          uptime: prev.uptime + 1
        }));
      }, 1000);
    } else {
      setVpnStatus(prev => ({
        ...prev,
        uptime: 0
      }));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [vpnStatus.connected]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              P2P VPN Shield
            </h1>
          </div>
          <p className="text-muted-foreground">
            Ultimate Peer-to-Peer VPN Protection
          </p>
        </div>

        {/* Main Connection Panel */}
        <ConnectionStatus 
          status={vpnStatus} 
          isConnecting={isConnecting}
          onConnect={handleConnect}
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Server Selection */}
          <div className="lg:col-span-1">
            <ServerSelector connected={vpnStatus.connected} />
          </div>

          {/* Security Panel */}
          <div className="lg:col-span-1">
            <SecurityPanel 
              killSwitch={vpnStatus.killSwitch}
              onToggleKillSwitch={toggleKillSwitch}
              encryption={vpnStatus.encryption}
            />
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <StatsPanel status={vpnStatus} />
          </div>
        </div>

        {/* Bottom Status Bar */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-accent" />
                  <span className="text-sm font-mono">{vpnStatus.encryption}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm">Zero Logs Policy</span>
                </div>
              </div>
              <Badge variant={vpnStatus.connected ? "default" : "secondary"} className="font-mono">
                {vpnStatus.connected ? 'SECURED' : 'DISCONNECTED'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VPNDashboard;
