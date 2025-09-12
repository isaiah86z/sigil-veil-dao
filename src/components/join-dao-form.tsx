import { useState } from 'react';
import { useDAOContract } from '@/hooks/use-dao-contract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAccount } from 'wagmi';

export const JoinDAOForm = () => {
  const { address, isConnected } = useAccount();
  const { joinDAO, isLoading } = useDAOContract();
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    initialReputation: 50,
  });

  const roles = [
    { value: 'contributor', label: 'Contributor' },
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'marketer', label: 'Marketer' },
    { value: 'advisor', label: 'Advisor' },
    { value: 'investor', label: 'Investor' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.name || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await joinDAO(
        formData.name,
        formData.role,
        formData.initialReputation
      );
      
      // Reset form
      setFormData({
        name: '',
        role: '',
        initialReputation: 50,
      });
    } catch (error) {
      console.error('Error joining DAO:', error);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Join the DAO</CardTitle>
          <CardDescription>
            Connect your wallet to join the Sigil Veil DAO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Please connect your wallet to join the DAO
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-gradient">Join the DAO</CardTitle>
        <CardDescription>
          Become a member of the Sigil Veil DAO community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your display name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange('role', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reputation">Initial Reputation Score</Label>
            <Input
              id="reputation"
              type="number"
              min="0"
              max="100"
              value={formData.initialReputation}
              onChange={(e) => handleInputChange('initialReputation', parseInt(e.target.value))}
            />
            <p className="text-sm text-muted-foreground">
              Your initial reputation score (0-100). This will be verified by the community.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Joining DAO...' : 'Join DAO'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
