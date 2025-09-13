import { WalletConnect } from '@/components/ui/wallet-connect';
import SigilVeilLogo from '@/assets/sigil-veil-logo.svg?react';

export const DaoHeader = () => {
  return (
    <header className="relative border-b mystical-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Logo and main title */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <SigilVeilLogo 
                className="w-16 h-16 sigil-rotate glow-sigil"
              />
            </div>
            
            <div>
              <h1 className="text-4xl font-display font-bold text-gradient mb-2">
                The Hidden Conclave
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Anonymous Members, Transparent Governance
              </p>
            </div>
          </div>

          {/* Wallet connect */}
          <div className="flex items-center space-x-4">
            <WalletConnect variant="mystical" />
          </div>
        </div>

        {/* Mystical stats bar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-accent glow-sigil">127</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary-glow">2.4M</div>
            <div className="text-sm text-muted-foreground">Total Voting Power</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient">42</div>
            <div className="text-sm text-muted-foreground">Active Proposals</div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-sigil rounded-full opacity-20 sigil-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-sigil rounded-full opacity-15 sigil-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </header>
  );
};