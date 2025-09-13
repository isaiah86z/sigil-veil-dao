# Sigil Veil DAO

> **A Mystical Decentralized Autonomous Organization with Privacy-Preserving Governance**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)
[![Powered by FHEVM](https://img.shields.io/badge/Powered%20by-FHEVM-00D4AA.svg)](https://docs.fhenix.io/)

## 🌟 Overview

Sigil Veil DAO represents the next evolution in decentralized governance, combining the mystical allure of secret societies with cutting-edge privacy technology. Built on the principles of transparency, anonymity, and collective wisdom, this DAO leverages Fully Homomorphic Encryption (FHE) to ensure that sensitive governance data remains private while maintaining full verifiability.

### ✨ Key Features

- **🔐 Privacy-First Governance**: All voting data and member information encrypted using FHEVM
- **🎭 Anonymous Participation**: Members can participate without revealing their identity
- **⚡ Real-Time Decision Making**: Instant proposal creation and voting with encrypted results
- **💰 Secure Treasury Management**: Encrypted financial transactions with multi-signature approval
- **🏆 Dynamic Reputation System**: Privacy-preserving reputation scoring and voting power calculation
- **🌐 Multi-Chain Ready**: Built for Ethereum Sepolia with expansion capabilities

## 🏗️ Architecture

### Smart Contract Layer
- **SigilVeilDAO.sol**: Core governance contract with FHE integration
- **Member Management**: Encrypted member registration and verification
- **Proposal System**: Privacy-preserving proposal creation and execution
- **Voting Mechanism**: Encrypted voting with homomorphic tallying
- **Treasury Operations**: Secure fund management with encrypted amounts

### Frontend Layer
- **React + TypeScript**: Modern, type-safe development
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first styling with mystical themes
- **shadcn/ui**: Beautiful, accessible component library
- **RainbowKit**: Seamless wallet integration

### Privacy Layer
- **FHEVM Integration**: Fully homomorphic encryption for sensitive data
- **Zero-Knowledge Proofs**: Verifiable computations without revealing inputs
- **Encrypted State Management**: All sensitive data encrypted at rest and in transit

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Web3 Wallet** (MetaMask, Rainbow, WalletConnect compatible)
- **Sepolia ETH** for gas fees
- **Git** for version control

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/isaiah86z/sigil-veil-dao.git
   cd sigil-veil-dao
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Your Browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🔧 Smart Contract Functions

### Member Management
```solidity
function joinDAO(string memory _name, string memory _role, externalEuint32 initialReputation, bytes calldata inputProof)
function getMemberInfo(uint256 memberId)
function updateMemberReputation(address member, externalEuint32 newReputation, bytes calldata inputProof)
function verifyMember(uint256 memberId, bool isVerified)
```

### Governance
```solidity
function createProposal(string memory _title, string memory _description, string memory _proposalType, uint256 _duration, externalEuint32 requiredQuorum, bytes calldata inputProof)
function castVote(uint256 proposalId, externalEuint32 memberId, ebool isFor, bytes calldata inputProof)
function executeProposal(uint256 proposalId)
function getProposalInfo(uint256 proposalId)
```

### Treasury Management
```solidity
function createTreasuryTransaction(address recipient, externalEuint32 amount, string memory _description, externalEuint32 transactionType, bytes calldata inputProof)
function approveTreasuryTransaction(uint256 transactionId)
function getTreasuryTransactionInfo(uint256 transactionId)
```

## 🎨 Design Philosophy

### Mystical Aesthetics
- **Color Palette**: Deep purples, mystical blues, and ethereal gradients
- **Typography**: Elegant fonts with mystical character
- **Animations**: Subtle sigil rotations and glowing effects
- **Layout**: Clean, modern interface with mystical elements

### User Experience
- **Intuitive Navigation**: Clear, accessible interface design
- **Responsive Design**: Seamless experience across all devices
- **Accessibility**: WCAG 2.1 AA compliant components
- **Performance**: Optimized for speed and efficiency

## 🔒 Privacy & Security

### Encryption Standards
- **FHE Implementation**: All sensitive data encrypted using FHEVM
- **Key Management**: Secure key generation and storage
- **Zero-Knowledge**: Verifiable computations without data exposure
- **Audit Trail**: Complete transaction history with privacy preservation

### Security Measures
- **Access Control**: Role-based permissions and verification
- **Input Validation**: Comprehensive validation of all inputs
- **Rate Limiting**: Protection against spam and abuse
- **Multi-Signature**: Treasury operations require multiple approvals

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Set all required environment variables
3. **Deploy**: Automatic deployment on every push to main branch

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to your preferred hosting service
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development
1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Your Changes**: Follow our coding standards
4. **Test Thoroughly**: Ensure all tests pass
5. **Submit a Pull Request**: Provide a clear description of your changes

### Areas for Contribution
- **Smart Contract Development**: Enhance governance mechanisms
- **Frontend Improvements**: UI/UX enhancements and new features
- **Documentation**: Improve guides and API documentation
- **Testing**: Add comprehensive test coverage
- **Security**: Security audits and vulnerability assessments

## 📊 Roadmap

### Phase 1: Foundation ✅
- [x] Core DAO functionality
- [x] FHE integration
- [x] Basic governance features
- [x] Member management system

### Phase 2: Enhancement 🚧
- [ ] Advanced proposal types
- [ ] Multi-signature treasury
- [ ] Reputation-based rewards
- [ ] Mobile application

### Phase 3: Expansion 🔮
- [ ] Multi-chain support
- [ ] Cross-DAO collaboration
- [ ] Advanced privacy features
- [ ] Integration with other protocols

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 18, TypeScript, Vite | Modern web application |
| **Styling** | Tailwind CSS, shadcn/ui | Responsive, accessible UI |
| **Web3** | Wagmi, RainbowKit, Viem | Blockchain interaction |
| **Encryption** | FHEVM, Zama Protocol | Privacy-preserving computations |
| **Blockchain** | Ethereum Sepolia | Smart contract deployment |
| **Development** | ESLint, Prettier | Code quality and formatting |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama Protocol** for FHEVM technology
- **RainbowKit** for seamless wallet integration
- **shadcn/ui** for beautiful component library
- **Vite** for excellent development experience
- **Ethereum Foundation** for blockchain infrastructure

## 📞 Support & Community

- **Documentation**: [Project Wiki](https://github.com/isaiah86z/sigil-veil-dao/wiki)
- **Issues**: [GitHub Issues](https://github.com/isaiah86z/sigil-veil-dao/issues)
- **Discussions**: [GitHub Discussions](https://github.com/isaiah86z/sigil-veil-dao/discussions)
- **Discord**: [Join our community](https://discord.gg/sigil-veil-dao)

---

<div align="center">

**Built with ❤️ for the decentralized future**

*"In the shadows of the blockchain, wisdom emerges through collective encryption"*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/isaiah86z/sigil-veil-dao)

</div>