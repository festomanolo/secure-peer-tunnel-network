
import React from 'react';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface SecurityPanelProps {
  killSwitch: boolean;
  onToggleKillSwitch: () => void;
  encryption: string;
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({
  killSwitch,
  onToggleKillSwitch,
  encryption
}) => {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-accent" />
          <span>Security Features</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Encryption Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Encryption</span>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {encryption}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Military-grade encryption with Perfect Forward Secrecy
          </div>
        </div>

        {/* Kill Switch */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${killSwitch ? 'bg-accent' : 'bg-muted-foreground'}`} />
              <span className="text-sm font-medium">Kill Switch</span>
            </div>
            <Switch
              checked={killSwitch}
              onCheckedChange={onToggleKillSwitch}
              className="data-[state=checked]:bg-accent"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {killSwitch 
              ? 'Automatically blocks internet if VPN disconnects'
              : 'Kill switch is disabled - internet may leak if VPN fails'
            }
          </div>
        </div>

        {/* Privacy Features */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="text-sm font-medium text-accent">Privacy Protection</div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <EyeOff className="h-4 w-4 text-accent" />
                <span className="text-sm">Zero Logs Policy</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-sm">DNS Leak Protection</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-accent" />
                <span className="text-sm">WebRTC Blocking</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
        </div>

        {/* Security Level Indicator */}
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <div className="text-center">
            <div className="text-lg font-bold text-accent">MAXIMUM</div>
            <div className="text-xs text-muted-foreground">Security Level</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPanel;
