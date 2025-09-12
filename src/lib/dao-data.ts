// Mock data for anonymous DAO members
// In a real implementation, this would come from blockchain/smart contracts

export interface DaoMember {
  memberIndex: number;
  governanceWeight: number;
  lastActiveBlock?: number;
  isDelegate?: boolean;
  joinedBlock: number;
}

export const mockMembers: DaoMember[] = [
  {
    memberIndex: 1,
    governanceWeight: 850000,
    lastActiveBlock: 18567890,
    isDelegate: true,
    joinedBlock: 18450000,
  },
  {
    memberIndex: 2,
    governanceWeight: 720000,
    lastActiveBlock: 18567234,
    isDelegate: false,
    joinedBlock: 18451200,
  },
  {
    memberIndex: 3,
    governanceWeight: 650000,
    lastActiveBlock: 18566789,
    isDelegate: true,
    joinedBlock: 18452100,
  },
  {
    memberIndex: 4,
    governanceWeight: 420000,
    lastActiveBlock: 18567123,
    isDelegate: false,
    joinedBlock: 18453000,
  },
  {
    memberIndex: 5,
    governanceWeight: 380000,
    lastActiveBlock: 18566543,
    isDelegate: false,
    joinedBlock: 18454500,
  },
  {
    memberIndex: 6,
    governanceWeight: 290000,
    lastActiveBlock: 18567001,
    isDelegate: true,
    joinedBlock: 18455200,
  },
  {
    memberIndex: 7,
    governanceWeight: 180000,
    lastActiveBlock: 18566890,
    isDelegate: false,
    joinedBlock: 18456800,
  },
  {
    memberIndex: 8,
    governanceWeight: 95000,
    lastActiveBlock: 18567456,
    isDelegate: false,
    joinedBlock: 18457900,
  },
  {
    memberIndex: 9,
    governanceWeight: 75000,
    lastActiveBlock: 18567321,
    isDelegate: false,
    joinedBlock: 18458600,
  },
  {
    memberIndex: 10,
    governanceWeight: 45000,
    lastActiveBlock: 18567789,
    isDelegate: false,
    joinedBlock: 18459200,
  },
];

export const getTotalGovernanceWeight = (): number => {
  return mockMembers.reduce((total, member) => total + member.governanceWeight, 0);
};

export const getActiveDelegates = (): DaoMember[] => {
  return mockMembers.filter(member => member.isDelegate);
};

export const getMembersByWeight = (descending = true): DaoMember[] => {
  return [...mockMembers].sort((a, b) => 
    descending ? b.governanceWeight - a.governanceWeight : a.governanceWeight - b.governanceWeight
  );
};