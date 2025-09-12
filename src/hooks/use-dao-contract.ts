import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract-config';
import { useState } from 'react';
import { toast } from 'sonner';

// Custom hook for DAO contract interactions
export const useDAOContract = () => {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Join DAO function
  const joinDAO = async (name: string, role: string, initialReputation: number) => {
    try {
      setIsLoading(true);
      
      // In a real implementation, you would encrypt the reputation using FHE
      // For now, we'll use a placeholder
      const encryptedReputation = new Uint8Array(32); // Placeholder for FHE encryption
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'joinDAO',
        args: [name, role, encryptedReputation, inputProof],
      });
      
      toast.success('Successfully joined the DAO!');
    } catch (err) {
      console.error('Error joining DAO:', err);
      toast.error('Failed to join DAO');
    } finally {
      setIsLoading(false);
    }
  };

  // Create proposal function
  const createProposal = async (
    title: string,
    description: string,
    proposalType: string,
    duration: number,
    requiredQuorum: number
  ) => {
    try {
      setIsLoading(true);
      
      // In a real implementation, you would encrypt the quorum using FHE
      const encryptedQuorum = new Uint8Array(32); // Placeholder for FHE encryption
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createProposal',
        args: [title, description, proposalType, duration, encryptedQuorum, inputProof],
      });
      
      toast.success('Proposal created successfully!');
    } catch (err) {
      console.error('Error creating proposal:', err);
      toast.error('Failed to create proposal');
    } finally {
      setIsLoading(false);
    }
  };

  // Cast vote function
  const castVote = async (proposalId: number, memberId: number, isFor: boolean) => {
    try {
      setIsLoading(true);
      
      // In a real implementation, you would encrypt the vote data using FHE
      const encryptedMemberId = new Uint8Array(32); // Placeholder for FHE encryption
      const encryptedIsFor = new Uint8Array(32); // Placeholder for FHE encryption
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'castVote',
        args: [proposalId, encryptedMemberId, encryptedIsFor, inputProof],
      });
      
      toast.success('Vote cast successfully!');
    } catch (err) {
      console.error('Error casting vote:', err);
      toast.error('Failed to cast vote');
    } finally {
      setIsLoading(false);
    }
  };

  // Execute proposal function
  const executeProposal = async (proposalId: number) => {
    try {
      setIsLoading(true);
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'executeProposal',
        args: [proposalId],
      });
      
      toast.success('Proposal executed successfully!');
    } catch (err) {
      console.error('Error executing proposal:', err);
      toast.error('Failed to execute proposal');
    } finally {
      setIsLoading(false);
    }
  };

  // Create treasury transaction function
  const createTreasuryTransaction = async (
    recipient: string,
    amount: number,
    description: string,
    transactionType: number
  ) => {
    try {
      setIsLoading(true);
      
      // In a real implementation, you would encrypt the amount and type using FHE
      const encryptedAmount = new Uint8Array(32); // Placeholder for FHE encryption
      const encryptedType = new Uint8Array(32); // Placeholder for FHE encryption
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createTreasuryTransaction',
        args: [recipient, encryptedAmount, description, encryptedType, inputProof],
      });
      
      toast.success('Treasury transaction created successfully!');
    } catch (err) {
      console.error('Error creating treasury transaction:', err);
      toast.error('Failed to create treasury transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    joinDAO,
    createProposal,
    castVote,
    executeProposal,
    createTreasuryTransaction,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess: isConfirmed,
    error,
    hash,
  };
};

// Hook for reading contract data
export const useDAOData = () => {
  // Get member info
  const getMemberInfo = (memberId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'getMemberInfo',
      args: [memberId],
    });
  };

  // Get proposal info
  const getProposalInfo = (proposalId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'getProposalInfo',
      args: [proposalId],
    });
  };

  // Get treasury transaction info
  const getTreasuryTransactionInfo = (transactionId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'getTreasuryTransactionInfo',
      args: [transactionId],
    });
  };

  return {
    getMemberInfo,
    getProposalInfo,
    getTreasuryTransactionInfo,
  };
};
