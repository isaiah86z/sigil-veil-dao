// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SigilVeilDAO is SepoliaConfig {
    using FHE for *;
    
    struct DAOMember {
        euint32 memberId;
        euint32 reputation;
        euint32 votingPower;
        euint32 contributionScore;
        bool isActive;
        bool isVerified;
        string name;
        string role;
        address memberAddress;
        uint256 joinTime;
        uint256 lastActivity;
    }
    
    struct Proposal {
        euint32 proposalId;
        euint32 votesFor;
        euint32 votesAgainst;
        euint32 totalVotes;
        euint32 requiredQuorum;
        bool isActive;
        bool isExecuted;
        string title;
        string description;
        string proposalType;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 executionTime;
    }
    
    struct Vote {
        euint32 voteId;
        euint32 proposalId;
        euint32 memberId;
        ebool isFor;
        euint32 votingPower;
        address voter;
        uint256 timestamp;
    }
    
    struct TreasuryTransaction {
        euint32 transactionId;
        euint32 amount;
        euint32 transactionType;
        bool isApproved;
        string description;
        address recipient;
        address approver;
        uint256 timestamp;
    }
    
    mapping(uint256 => DAOMember) public members;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Vote) public votes;
    mapping(uint256 => TreasuryTransaction) public treasuryTransactions;
    mapping(address => uint256) public memberAddressToId;
    mapping(address => euint32) public memberReputation;
    
    uint256 public memberCounter;
    uint256 public proposalCounter;
    uint256 public voteCounter;
    uint256 public transactionCounter;
    
    address public owner;
    address public verifier;
    euint32 public totalTreasury;
    euint32 public minVotingPower;
    euint32 public quorumThreshold;
    
    event MemberJoined(uint256 indexed memberId, address indexed memberAddress, string name);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed voteId, uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId, bool success);
    event TreasuryTransactionCreated(uint256 indexed transactionId, address indexed recipient);
    event ReputationUpdated(address indexed member, uint32 reputation);
    event MemberVerified(uint256 indexed memberId, bool isVerified);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        minVotingPower = FHE.asEuint32(100);
        quorumThreshold = FHE.asEuint32(30); // 30% quorum
        totalTreasury = FHE.asEuint32(0);
    }
    
    function joinDAO(
        string memory _name,
        string memory _role,
        externalEuint32 initialReputation,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(memberAddressToId[msg.sender] == 0, "Member already exists");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        uint256 memberId = memberCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalReputation = FHE.fromExternal(initialReputation, inputProof);
        
        members[memberId] = DAOMember({
            memberId: FHE.asEuint32(0), // Will be set properly later
            reputation: internalReputation,
            votingPower: FHE.mul(internalReputation, FHE.asEuint32(10)), // Voting power = reputation * 10
            contributionScore: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            role: _role,
            memberAddress: msg.sender,
            joinTime: block.timestamp,
            lastActivity: block.timestamp
        });
        
        memberAddressToId[msg.sender] = memberId;
        memberReputation[msg.sender] = internalReputation;
        
        emit MemberJoined(memberId, msg.sender, _name);
        return memberId;
    }
    
    function createProposal(
        string memory _title,
        string memory _description,
        string memory _proposalType,
        uint256 _duration,
        externalEuint32 requiredQuorum,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(memberAddressToId[msg.sender] > 0, "Only members can create proposals");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 proposalId = proposalCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalQuorum = FHE.fromExternal(requiredQuorum, inputProof);
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            votesFor: FHE.asEuint32(0),
            votesAgainst: FHE.asEuint32(0),
            totalVotes: FHE.asEuint32(0),
            requiredQuorum: internalQuorum,
            isActive: true,
            isExecuted: false,
            title: _title,
            description: _description,
            proposalType: _proposalType,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            executionTime: 0
        });
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function castVote(
        uint256 proposalId,
        externalEuint32 memberId,
        ebool isFor,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        require(memberAddressToId[msg.sender] > 0, "Only members can vote");
        
        uint256 voteId = voteCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalMemberId = FHE.fromExternal(memberId, inputProof);
        
        // Get member's voting power
        uint256 memberIdNum = memberAddressToId[msg.sender];
        euint32 votingPower = members[memberIdNum].votingPower;
        
        votes[voteId] = Vote({
            voteId: FHE.asEuint32(0), // Will be set properly later
            proposalId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            memberId: internalMemberId,
            isFor: isFor,
            votingPower: votingPower,
            voter: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update proposal vote counts
        if (FHE.decrypt(isFor)) {
            proposals[proposalId].votesFor = FHE.add(proposals[proposalId].votesFor, votingPower);
        } else {
            proposals[proposalId].votesAgainst = FHE.add(proposals[proposalId].votesAgainst, votingPower);
        }
        
        proposals[proposalId].totalVotes = FHE.add(proposals[proposalId].totalVotes, votingPower);
        
        emit VoteCast(voteId, proposalId, msg.sender);
        return voteId;
    }
    
    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period not ended");
        require(!proposals[proposalId].isExecuted, "Proposal already executed");
        
        // Check if quorum is met and proposal passed
        euint32 totalVotingPower = FHE.asEuint32(1000); // This should be calculated from all members
        euint32 quorumMet = FHE.gte(proposals[proposalId].totalVotes, FHE.mul(totalVotingPower, FHE.div(proposals[proposalId].requiredQuorum, FHE.asEuint32(100))));
        euint32 proposalPassed = FHE.gt(proposals[proposalId].votesFor, proposals[proposalId].votesAgainst);
        
        bool success = FHE.decrypt(quorumMet) && FHE.decrypt(proposalPassed);
        
        proposals[proposalId].isExecuted = true;
        proposals[proposalId].isActive = false;
        proposals[proposalId].executionTime = block.timestamp;
        
        emit ProposalExecuted(proposalId, success);
    }
    
    function createTreasuryTransaction(
        address recipient,
        externalEuint32 amount,
        string memory _description,
        externalEuint32 transactionType,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(memberAddressToId[msg.sender] > 0, "Only members can create transactions");
        require(recipient != address(0), "Invalid recipient");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalType = FHE.fromExternal(transactionType, inputProof);
        
        treasuryTransactions[transactionId] = TreasuryTransaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            transactionType: internalType,
            isApproved: false,
            description: _description,
            recipient: recipient,
            approver: address(0),
            timestamp: block.timestamp
        });
        
        emit TreasuryTransactionCreated(transactionId, recipient);
        return transactionId;
    }
    
    function approveTreasuryTransaction(uint256 transactionId) public {
        require(msg.sender == verifier, "Only verifier can approve transactions");
        require(treasuryTransactions[transactionId].recipient != address(0), "Transaction does not exist");
        require(!treasuryTransactions[transactionId].isApproved, "Transaction already approved");
        
        treasuryTransactions[transactionId].isApproved = true;
        treasuryTransactions[transactionId].approver = msg.sender;
        
        // Update treasury balance
        totalTreasury = FHE.sub(totalTreasury, treasuryTransactions[transactionId].amount);
    }
    
    function updateMemberReputation(
        address member,
        externalEuint32 newReputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(memberAddressToId[member] > 0, "Member does not exist");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalReputation = FHE.fromExternal(newReputation, inputProof);
        
        uint256 memberId = memberAddressToId[member];
        members[memberId].reputation = internalReputation;
        members[memberId].votingPower = FHE.mul(internalReputation, FHE.asEuint32(10));
        members[memberId].lastActivity = block.timestamp;
        
        memberReputation[member] = internalReputation;
        
        emit ReputationUpdated(member, 0); // FHE.decrypt(internalReputation) - will be decrypted off-chain
    }
    
    function verifyMember(uint256 memberId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify members");
        require(members[memberId].memberAddress != address(0), "Member does not exist");
        
        members[memberId].isVerified = isVerified;
        emit MemberVerified(memberId, isVerified);
    }
    
    function getMemberInfo(uint256 memberId) public view returns (
        string memory name,
        string memory role,
        uint8 reputation,
        uint8 votingPower,
        uint8 contributionScore,
        bool isActive,
        bool isVerified,
        address memberAddress,
        uint256 joinTime,
        uint256 lastActivity
    ) {
        DAOMember storage member = members[memberId];
        return (
            member.name,
            member.role,
            0, // FHE.decrypt(member.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(member.votingPower) - will be decrypted off-chain
            0, // FHE.decrypt(member.contributionScore) - will be decrypted off-chain
            member.isActive,
            member.isVerified,
            member.memberAddress,
            member.joinTime,
            member.lastActivity
        );
    }
    
    function getProposalInfo(uint256 proposalId) public view returns (
        string memory title,
        string memory description,
        string memory proposalType,
        uint8 votesFor,
        uint8 votesAgainst,
        uint8 totalVotes,
        uint8 requiredQuorum,
        bool isActive,
        bool isExecuted,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        uint256 executionTime
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            proposal.proposalType,
            0, // FHE.decrypt(proposal.votesFor) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.votesAgainst) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.requiredQuorum) - will be decrypted off-chain
            proposal.isActive,
            proposal.isExecuted,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.executionTime
        );
    }
    
    function getVoteInfo(uint256 voteId) public view returns (
        uint8 proposalId,
        uint8 memberId,
        bool isFor,
        uint8 votingPower,
        address voter,
        uint256 timestamp
    ) {
        Vote storage vote = votes[voteId];
        return (
            0, // FHE.decrypt(vote.proposalId) - will be decrypted off-chain
            0, // FHE.decrypt(vote.memberId) - will be decrypted off-chain
            FHE.decrypt(vote.isFor),
            0, // FHE.decrypt(vote.votingPower) - will be decrypted off-chain
            vote.voter,
            vote.timestamp
        );
    }
    
    function getTreasuryTransactionInfo(uint256 transactionId) public view returns (
        uint8 amount,
        uint8 transactionType,
        bool isApproved,
        string memory description,
        address recipient,
        address approver,
        uint256 timestamp
    ) {
        TreasuryTransaction storage transaction = treasuryTransactions[transactionId];
        return (
            0, // FHE.decrypt(transaction.amount) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.transactionType) - will be decrypted off-chain
            transaction.isApproved,
            transaction.description,
            transaction.recipient,
            transaction.approver,
            transaction.timestamp
        );
    }
    
    function getMemberReputation(address member) public view returns (uint8) {
        return 0; // FHE.decrypt(memberReputation[member]) - will be decrypted off-chain
    }
    
    function getTreasuryBalance() public view returns (uint8) {
        return 0; // FHE.decrypt(totalTreasury) - will be decrypted off-chain
    }
}