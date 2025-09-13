import { WalletConnect } from '@/components/ui/wallet-connect';

export const DaoHeader = () => {
  return (
    <header className="relative border-b mystical-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Logo and main title */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 sigil-rotate glow-sigil">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer mystical ring */}
                  <circle cx="32" cy="32" r="30" stroke="url(#gradient1)" strokeWidth="2" fill="none" opacity="0.8"/>
                  
                  {/* Inner sigil design */}
                  <g transform="translate(32, 32)">
                    {/* Central hexagon */}
                    <polygon points="0,-20 17.32,-10 17.32,10 0,20 -17.32,10 -17.32,-10" 
                             fill="url(#gradient2)" opacity="0.9"/>
                    
                    {/* Mystical symbols */}
                    <circle cx="0" cy="0" r="8" fill="url(#gradient3)" opacity="0.7"/>
                    
                    {/* Veil effect lines */}
                    <line x1="-15" y1="-15" x2="15" y2="15" stroke="url(#gradient4)" strokeWidth="1" opacity="0.6"/>
                    <line x1="15" y1="-15" x2="-15" y2="15" stroke="url(#gradient4)" strokeWidth="1" opacity="0.6"/>
                    
                    {/* Corner sigils */}
                    <circle cx="-22" cy="-22" r="3" fill="url(#gradient5)" opacity="0.8"/>
                    <circle cx="22" cy="-22" r="3" fill="url(#gradient5)" opacity="0.8"/>
                    <circle cx="-22" cy="22" r="3" fill="url(#gradient5)" opacity="0.8"/>
                    <circle cx="22" cy="22" r="3" fill="url(#gradient5)" opacity="0.8"/>
                  </g>
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#8B5CF6', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#A855F7', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#C084FC', stopOpacity:1}} />
                    </linearGradient>
                    
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#06B6D4', stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:'#0891B2', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#0E7490', stopOpacity:1}} />
                    </linearGradient>
                    
                    <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" style={{stopColor:'#F59E0B', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#D97706', stopOpacity:1}} />
                    </radialGradient>
                    
                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#EC4899', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#BE185D', stopOpacity:1}} />
                    </linearGradient>
                    
                    <radialGradient id="gradient5" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" style={{stopColor:'#10B981', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#059669', stopOpacity:1}} />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
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