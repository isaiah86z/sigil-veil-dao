// Contract configuration for Sigil Veil DAO
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

// Contract ABI - This would be generated from the compiled contract
export const CONTRACT_ABI = [
  // Member Management
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_role", "type": "string"},
      {"internalType": "bytes", "name": "initialReputation", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "joinDAO",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "memberId", "type": "uint256"}],
    "name": "getMemberInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "role", "type": "string"},
      {"internalType": "uint8", "name": "reputation", "type": "uint8"},
      {"internalType": "uint8", "name": "votingPower", "type": "uint8"},
      {"internalType": "uint8", "name": "contributionScore", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "memberAddress", "type": "address"},
      {"internalType": "uint256", "name": "joinTime", "type": "uint256"},
      {"internalType": "uint256", "name": "lastActivity", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Proposal Management
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_proposalType", "type": "string"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "bytes", "name": "requiredQuorum", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createProposal",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "getProposalInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "proposalType", "type": "string"},
      {"internalType": "uint8", "name": "votesFor", "type": "uint8"},
      {"internalType": "uint8", "name": "votesAgainst", "type": "uint8"},
      {"internalType": "uint8", "name": "totalVotes", "type": "uint8"},
      {"internalType": "uint8", "name": "requiredQuorum", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isExecuted", "type": "bool"},
      {"internalType": "address", "name": "proposer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "uint256", "name": "executionTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Voting
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"internalType": "bytes", "name": "memberId", "type": "bytes"},
      {"internalType": "bytes", "name": "isFor", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "castVote",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "executeProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Treasury Management
  {
    "inputs": [
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "bytes", "name": "transactionType", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createTreasuryTransaction",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "transactionId", "type": "uint256"}],
    "name": "getTreasuryTransactionInfo",
    "outputs": [
      {"internalType": "uint8", "name": "amount", "type": "uint8"},
      {"internalType": "uint8", "name": "transactionType", "type": "uint8"},
      {"internalType": "bool", "name": "isApproved", "type": "bool"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "address", "name": "approver", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "memberId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "memberAddress", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"}
    ],
    "name": "MemberJoined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "proposer", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "title", "type": "string"}
    ],
    "name": "ProposalCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "voteId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "voter", "type": "address"}
    ],
    "name": "VoteCast",
    "type": "event"
  }
] as const;

// Chain configuration
export const CHAIN_CONFIG = {
  id: 11155111, // Sepolia
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_RPC_URL || 'https://1rpc.io/sepolia'],
    },
    public: {
      http: ['https://1rpc.io/sepolia'],
    },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
} as const;
