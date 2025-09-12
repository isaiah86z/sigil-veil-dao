import { ConnectButton } from '@rainbow-me/rainbowkit';
import { cn } from '@/lib/utils';

interface WalletConnectProps {
  className?: string;
  variant?: 'default' | 'mystical' | 'sigil';
}

export const WalletConnect = ({ className, variant = 'mystical' }: WalletConnectProps) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={cn(
                      'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                      variant === 'mystical' && [
                        'bg-gradient-to-r from-primary to-primary-glow',
                        'text-primary-foreground shadow-lg glow-primary',
                        'hover:shadow-2xl hover:scale-105',
                        'border border-primary/50'
                      ],
                      variant === 'sigil' && [
                        'bg-card border mystical-border',
                        'text-card-foreground glow-sigil',
                        'hover:border-accent/50'
                      ],
                      className
                    )}
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={cn(
                      'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                      'bg-destructive text-destructive-foreground',
                      'hover:bg-destructive/90 border border-destructive/50',
                      className
                    )}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex gap-2">
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                      'bg-secondary text-secondary-foreground',
                      'hover:bg-secondary/80 border border-border',
                      className
                    )}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                      variant === 'mystical' && [
                        'bg-gradient-to-r from-primary to-primary-glow',
                        'text-primary-foreground glow-primary',
                        'hover:shadow-xl border border-primary/50'
                      ],
                      className
                    )}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};