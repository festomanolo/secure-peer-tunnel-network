
import React, { useState } from 'react';
import { Globe, Zap, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ServerNode {
  id: string;
  name: string;
  location: string;
  latency: number;
  load: number;
  peers: number;
  status: 'excellent' | 'good' | 'fair';
}

interface ServerSelectorProps {
  connected: boolean;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ connected }) => {
  const [servers] = useState<ServerNode[]>([
    {
      id: '1',
      name: 'peer-node-001.p2p',
      location: 'Global Network',
      latency: 12,
      load: 25,
      peers: 1247,
      status: 'excellent'
    },
    {
      id: '2',
      name: 'peer-node-002.p2p',
      location: 'European Cluster',
      latency: 28,
      load: 45,
      peers: 892,
      status: 'good'
    },
    {
      id: '3',
      name: 'peer-node-003.p2p',
      location: 'Asia-Pacific',
      latency: 67,
      load: 78,
      peers: 534,
      status: 'fair'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-accent bg-accent/10';
      case 'good': return 'text-yellow-400 bg-yellow-400/10';
      case 'fair': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-muted-foreground bg-secondary/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return '🟢';
      case 'good': return '🟡';
      case 'fair': return '🟠';
      default: return '🔴';
    }
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <span>P2P Network Nodes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:border-primary/50 ${
              connected && server.id === '1'
                ? 'border-accent bg-accent/5'
                : 'border-border bg-secondary/20'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(server.status)}</span>
                  <div>
                    <div className="font-mono text-sm font-medium">{server.name}</div>
                    <div className="text-xs text-muted-foreground">{server.location}</div>
                  </div>
                </div>
                {connected && server.id === '1' && (
                  <Badge className="bg-accent text-accent-foreground">Connected</Badge>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>{server.latency}ms</span>
                  </div>
                  <div className="text-muted-foreground">Latency</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>{server.load}%</span>
                  </div>
                  <div className="text-muted-foreground">Load</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{server.peers}</span>
                  </div>
                  <div className="text-muted-foreground">Peers</div>
                </div>
              </div>

              <div className="w-full bg-secondary/30 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    server.status === 'excellent' 
                      ? 'bg-accent' 
                      : server.status === 'good' 
                      ? 'bg-yellow-400' 
                      : 'bg-orange-400'
                  }`}
                  style={{ width: `${100 - server.load}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        <Button 
          variant="outline" 
          className="w-full mt-4 border-primary/20 hover:border-primary/50"
          disabled={connected}
        >
          <Zap className="h-4 w-4 mr-2" />
          Auto-Select Fastest Node
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServerSelector;
