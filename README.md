# Sigil Veil DAO

A decentralized autonomous organization (DAO) built with FHE (Fully Homomorphic Encryption) technology for privacy-preserving governance and treasury management.

## Features

- **Privacy-Preserving Governance**: All voting data and member information is encrypted using FHE
- **Decentralized Decision Making**: Community-driven proposal creation and voting
- **Treasury Management**: Secure and transparent fund management with encrypted transactions
- **Member Reputation System**: Encrypted reputation scoring and voting power calculation
- **Multi-Wallet Support**: Compatible with popular Web3 wallets including Rainbow, MetaMask, and more

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Web3**: Wagmi, RainbowKit, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

1. Clone the repository:
```bash
git clone https://github.com/isaiah86z/sigil-veil-dao.git
cd sigil-veil-dao
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Update the `.env.local` file with your configuration:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Smart Contract

The DAO is powered by a Solidity smart contract that implements:

- **Member Management**: Join, verify, and manage DAO members
- **Proposal System**: Create, vote on, and execute proposals
- **Treasury Management**: Handle encrypted financial transactions
- **Reputation System**: Track and update member reputation scores
- **FHE Integration**: All sensitive data is encrypted using FHEVM

### Contract Functions

- `joinDAO()`: Become a member of the DAO
- `createProposal()`: Submit new governance proposals
- `castVote()`: Vote on active proposals
- `executeProposal()`: Execute approved proposals
- `createTreasuryTransaction()`: Propose treasury transactions
- `updateMemberReputation()`: Update member reputation scores

## Privacy Features

All sensitive data in the DAO is encrypted using Fully Homomorphic Encryption:

- **Vote Privacy**: Individual votes are encrypted and only aggregate results are visible
- **Reputation Privacy**: Member reputation scores are encrypted
- **Treasury Privacy**: Transaction amounts are encrypted
- **Member Data Privacy**: Personal information is protected

## Deployment

### Smart Contract Deployment

1. Deploy the contract to Sepolia testnet:
```bash
# Add deployment script here
```

2. Update the contract address in your environment variables

### Frontend Deployment

The application can be deployed to various platforms:

#### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Security

This project implements several security measures:

- **FHE Encryption**: All sensitive data is encrypted using FHEVM
- **Access Control**: Role-based permissions for different functions
- **Input Validation**: Comprehensive validation of all inputs
- **Audit Trail**: All actions are logged and verifiable

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue in this repository
- Join our community discussions
- Check the documentation for common questions

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced proposal types
- [ ] Integration with other DAO tools
- [ ] Mobile application
- [ ] Enhanced privacy features

---

Built with ❤️ for the decentralized future