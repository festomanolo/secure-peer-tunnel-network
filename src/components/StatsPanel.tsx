
import React from 'react';
import { Activity, Download, Upload, HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VPNStatus } from './VPNDashboard';

interface StatsPanelProps {
  status: VPNStatus;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ status }) => {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>Connection Stats</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Speed Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Download className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">Download</span>
            </div>
            <div className="font-mono text-lg font-bold text-accent">
              {status.downloadSpeed}
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Upload className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Upload</span>
            </div>
            <div className="font-mono text-lg font-bold text-primary">
              {status.uploadSpeed}
            </div>
          </div>
        </div>

        {/* Data Transfer */}
        <div className="text-center space-y-2 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center space-x-1">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Data Transferred</span>
          </div>
          <div className="font-mono text-xl font-bold">
            {status.dataTransferred}
          </div>
        </div>

        {/* Protocol Info */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <div className="text-sm font-medium text-primary">Protocol Details</div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Protocol:</span>
              <span className="font-mono">WireGuard</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Port:</span>
              <span className="font-mono">51820</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MTU:</span>
              <span className="font-mono">1420</span>
            </div>
          </div>
        </div>

        {/* Network Quality Indicator */}
        {status.connected && (
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network Quality</span>
              <div className="flex space-x-1">
                <div className="w-2 h-4 bg-accent rounded-sm" />
                <div className="w-2 h-4 bg-accent rounded-sm" />
                <div className="w-2 h-4 bg-accent rounded-sm" />
                <div className="w-2 h-4 bg-accent rounded-sm" />
                <div className="w-2 h-4 bg-accent/30 rounded-sm" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
