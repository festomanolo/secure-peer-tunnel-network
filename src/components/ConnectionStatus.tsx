
import React from 'react';
import { Power, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VPNStatus } from './VPNDashboard';

interface ConnectionStatusProps {
  status: VPNStatus;
  isConnecting: boolean;
  onConnect: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  isConnecting,
  onConnect
}) => {
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`glass-card transition-all duration-500 ${
      status.connected ? 'neon-glow-green' : ''
    }`}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* Connection Icon */}
          <div className="relative inline-flex">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
              status.connected 
                ? 'success-gradient neon-glow-green' 
                : 'bg-secondary/50'
            }`}>
              {isConnecting ? (
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              ) : status.connected ? (
                <Wifi className="h-12 w-12 text-white" />
              ) : (
                <WifiOff className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            
            {/* Pulse rings when connected */}
            {status.connected && (
              <>
                <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-accent/30 animate-ping" />
                <div className="absolute inset-0 w-24 h-24 rounded-full border border-accent/20 animate-pulse" />
              </>
            )}
          </div>

          {/* Status Text */}
          <div className="space-y-2">
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${
              status.connected ? 'text-accent' : 'text-muted-foreground'
            }`}>
              {isConnecting ? 'Connecting...' : status.connected ? 'Connected' : 'Disconnected'}
            </h2>
            
            {status.connected && status.location && (
              <div className="space-y-1">
                <p className="text-muted-foreground">Connected to</p>
                <p className="font-mono text-primary">{status.server}</p>
                <p className="text-sm text-muted-foreground">{status.location}</p>
              </div>
            )}
          </div>

          {/* Connection Time */}
          {status.connected && (
            <div className="bg-secondary/30 rounded-lg p-3 inline-block">
              <div className="text-sm text-muted-foreground">Connection Time</div>
              <div className="font-mono text-lg text-primary">{formatUptime(status.uptime)}</div>
            </div>
          )}

          {/* Connect Button */}
          <Button
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className={`w-48 h-12 font-semibold transition-all duration-300 ${
              status.connected
                ? 'bg-destructive hover:bg-destructive/80'
                : 'cyber-gradient neon-glow hover:shadow-lg'
            }`}
          >
            <Power className="h-5 w-5 mr-2" />
            {isConnecting ? 'Connecting...' : status.connected ? 'Disconnect' : 'Quick Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatus;
