import { DaoMemberCard } from '@/components/dao-member-card';
import { mockMembers, getMembersByWeight } from '@/lib/dao-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Search, Filter, Users, Crown } from 'lucide-react';

export const DaoMembersGrid = () => {
  const [sortBy, setSortBy] = useState<'weight' | 'recent' | 'index'>('weight');
  const [filterBy, setFilterBy] = useState<'all' | 'delegates' | 'members'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = mockMembers.filter(member => {
    if (filterBy === 'delegates' && !member.isDelegate) return false;
    if (filterBy === 'members' && member.isDelegate) return false;
    if (searchTerm && !member.memberIndex.toString().includes(searchTerm)) return false;
    return true;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case 'weight':
        return b.governanceWeight - a.governanceWeight;
      case 'recent':
        return (b.lastActiveBlock || 0) - (a.lastActiveBlock || 0);
      case 'index':
        return a.memberIndex - b.memberIndex;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Section header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-card rounded-full mystical-border glow-sigil">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-gradient">
              Anonymous Membership Registry
            </h2>
            <p className="text-muted-foreground mt-1">
              Encrypted identities, transparent governance power
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-card/50 rounded-lg mystical-border backdrop-blur-sm">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by member #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background/50 border mystical-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: 'weight' | 'recent' | 'index') => setSortBy(value)}>
          <SelectTrigger className="mystical-border bg-background/50">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border mystical-border">
            <SelectItem value="weight">Governance Weight</SelectItem>
            <SelectItem value="recent">Recent Activity</SelectItem>
            <SelectItem value="index">Member Index</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter */}
        <Select value={filterBy} onValueChange={(value: 'all' | 'delegates' | 'members') => setFilterBy(value)}>
          <SelectTrigger className="mystical-border bg-background/50">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border mystical-border">
            <SelectItem value="all">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>All Members</span>
              </div>
            </SelectItem>
            <SelectItem value="delegates">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span>Delegates Only</span>
              </div>
            </SelectItem>
            <SelectItem value="members">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Members Only</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-card/30 rounded-lg mystical-border">
          <div className="text-2xl font-bold text-accent">{filteredMembers.length}</div>
          <div className="text-xs text-muted-foreground">Showing</div>
        </div>
        <div className="text-center p-4 bg-card/30 rounded-lg mystical-border">
          <div className="text-2xl font-bold text-primary-glow">{filteredMembers.filter(m => m.isDelegate).length}</div>
          <div className="text-xs text-muted-foreground">Delegates</div>
        </div>
        <div className="text-center p-4 bg-card/30 rounded-lg mystical-border">
          <div className="text-2xl font-bold text-gradient">
            {Math.round(filteredMembers.reduce((sum, m) => sum + m.governanceWeight, 0) / 1000000 * 10) / 10}M
          </div>
          <div className="text-xs text-muted-foreground">Total Weight</div>
        </div>
        <div className="text-center p-4 bg-card/30 rounded-lg mystical-border">
          <div className="text-2xl font-bold text-foreground">
            {filteredMembers.reduce((avg, m) => avg + m.governanceWeight, 0) / filteredMembers.length > 0 
              ? Math.round(filteredMembers.reduce((avg, m) => avg + m.governanceWeight, 0) / filteredMembers.length / 1000) 
              : 0}K
          </div>
          <div className="text-xs text-muted-foreground">Avg Weight</div>
        </div>
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMembers.map((member) => (
          <DaoMemberCard
            key={member.memberIndex}
            memberIndex={member.memberIndex}
            governanceWeight={member.governanceWeight}
            lastActiveBlock={member.lastActiveBlock}
            isDelegate={member.isDelegate}
          />
        ))}
      </div>

      {sortedMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No members found matching your criteria
          </div>
          <Button 
            variant="sigil" 
            onClick={() => {
              setSearchTerm('');
              setFilterBy('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};