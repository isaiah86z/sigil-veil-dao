import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import sigilMember from '@/assets/sigil-member.png';

interface DaoMemberCardProps {
  memberIndex: number;
  governanceWeight: number;
  lastActiveBlock?: number;
  isDelegate?: boolean;
}

export const DaoMemberCard = ({ 
  memberIndex, 
  governanceWeight, 
  lastActiveBlock,
  isDelegate = false 
}: DaoMemberCardProps) => {
  const formatWeight = (weight: number) => {
    if (weight >= 1000000) {
      return `${(weight / 1000000).toFixed(1)}M`;
    }
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)}K`;
    }
    return weight.toString();
  };

  return (
    <Card className="member-card p-6 relative overflow-hidden group">
      {/* Mystical background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/10 opacity-50" />
      
      {/* Member sigil */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={sigilMember} 
              alt="Anonymous Member Sigil" 
              className="w-12 h-12 sigil-pulse opacity-80 group-hover:opacity-100 transition-opacity"
            />
            {isDelegate && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full glow-sigil animate-pulse" />
            )}
          </div>
          
          <div>
            <h3 className="font-display text-lg text-foreground">
              Member #{memberIndex.toString().padStart(4, '0')}
            </h3>
            <p className="text-sm text-muted-foreground">
              Anonymous Participant
            </p>
          </div>
        </div>

        {isDelegate && (
          <Badge variant="outline" className="text-accent border-accent/50 bg-accent/10">
            Delegate
          </Badge>
        )}
      </div>

      {/* Governance stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Governance Weight</span>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-gradient">
              {formatWeight(governanceWeight)}
            </span>
            <span className="text-xs text-muted-foreground">VOTES</span>
          </div>
        </div>

        {lastActiveBlock && (
          <div className="flex justify-between items-center pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground">Last Active</span>
            <span className="text-xs text-foreground">Block #{lastActiveBlock.toLocaleString()}</span>
          </div>
        )}

        {/* Voting power bar */}
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 glow-primary"
            style={{ width: `${Math.min((governanceWeight / 1000000) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};