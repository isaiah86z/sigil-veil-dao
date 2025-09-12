import { useState } from 'react';
import { useDAOContract } from '@/hooks/use-dao-contract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAccount } from 'wagmi';

export const ProposalForm = () => {
  const { address, isConnected } = useAccount();
  const { createProposal, isLoading } = useDAOContract();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    proposalType: '',
    duration: 7, // days
    requiredQuorum: 30, // percentage
  });

  const proposalTypes = [
    { value: 'governance', label: 'Governance' },
    { value: 'treasury', label: 'Treasury' },
    { value: 'membership', label: 'Membership' },
    { value: 'technical', label: 'Technical' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.title || !formData.description || !formData.proposalType) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await createProposal(
        formData.title,
        formData.description,
        formData.proposalType,
        formData.duration * 24 * 60 * 60, // convert days to seconds
        formData.requiredQuorum
      );
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        proposalType: '',
        duration: 7,
        requiredQuorum: 30,
      });
    } catch (error) {
      console.error('Error creating proposal:', error);
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Proposal</CardTitle>
          <CardDescription>
            Connect your wallet to create a new proposal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Please connect your wallet to create proposals
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-gradient">Create New Proposal</CardTitle>
        <CardDescription>
          Submit a new governance proposal to the DAO
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter proposal title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your proposal in detail"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposalType">Proposal Type *</Label>
            <Select
              value={formData.proposalType}
              onValueChange={(value) => handleInputChange('proposalType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select proposal type" />
              </SelectTrigger>
              <SelectContent>
                {proposalTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quorum">Required Quorum (%)</Label>
              <Input
                id="quorum"
                type="number"
                min="1"
                max="100"
                value={formData.requiredQuorum}
                onChange={(e) => handleInputChange('requiredQuorum', parseInt(e.target.value))}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Proposal...' : 'Create Proposal'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
