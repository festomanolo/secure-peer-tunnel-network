
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
    <Card className={`floating-card transition-all duration-500 ${
      status.connected ? 'liquid-flow' : ''
    }`}>
      <CardContent className="p-12">
        <div className="text-center space-y-8">
          {/* Connection Icon */}
          <div className="relative inline-flex">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center smooth-transition ${
              status.connected 
                ? 'bg-foreground text-background status-pulse' 
                : 'liquid-glass text-foreground'
            }`}>
              {isConnecting ? (
                <Loader2 className="h-16 w-16 animate-spin" />
              ) : status.connected ? (
                <Wifi className="h-16 w-16" />
              ) : (
                <WifiOff className="h-16 w-16" />
              )}
            </div>
          </div>

          {/* Status Text */}
          <div className="space-y-3">
            <h2 className={`text-3xl font-light smooth-transition ${
              status.connected ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {isConnecting ? 'Connecting...' : status.connected ? 'Connected' : 'Disconnected'}
            </h2>
            
            {status.connected && status.location && (
              <div className="space-y-2">
                <p className="text-muted-foreground font-light">Connected to</p>
                <p className="font-mono text-xl font-medium text-foreground">{status.server}</p>
                <p className="text-muted-foreground">{status.location}</p>
              </div>
            )}
          </div>

          {/* Connection Time */}
          {status.connected && (
            <div className="floating-card p-4 inline-block">
              <div className="text-sm text-muted-foreground font-light">Connection Time</div>
              <div className="font-mono text-2xl font-medium text-foreground">{formatUptime(status.uptime)}</div>
            </div>
          )}

          {/* Connect Button */}
          <Button
            onClick={onConnect}
            disabled={isConnecting}
            size="lg"
            className={`liquid-button w-56 h-14 text-lg font-medium ${
              status.connected
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-foreground text-background hover:bg-foreground/90'
            }`}
          >
            <Power className="h-6 w-6 mr-3" />
            {isConnecting ? 'Connecting...' : status.connected ? 'Disconnect' : 'Quick Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatus;
