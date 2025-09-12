import { DaoHeader } from '@/components/dao-header';
import { DaoMembersGrid } from '@/components/dao-members-grid';
import { JoinDAOForm } from '@/components/join-dao-form';
import { ProposalForm } from '@/components/proposal-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-mystical">
      <DaoHeader />
      <main className="container mx-auto px-6 py-12">
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="join">Join DAO</TabsTrigger>
            <TabsTrigger value="proposals">Create Proposal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-8">
            <DaoMembersGrid />
          </TabsContent>
          
          <TabsContent value="join" className="flex justify-center">
            <JoinDAOForm />
          </TabsContent>
          
          <TabsContent value="proposals" className="flex justify-center">
            <ProposalForm />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Mystical background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-sigil rounded-full opacity-10 sigil-pulse" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-gradient-sigil rounded-full opacity-5 sigil-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/4 w-48 h-48 bg-gradient-sigil rounded-full opacity-15 sigil-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};

export default Index;
