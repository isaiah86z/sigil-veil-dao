import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Sigil Veil DAO',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_WALLET_CONNECT_PROJECT_ID',
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

// Custom theme for RainbowKit to match our mystical design
export const customTheme = {
  blurs: {
    modalOverlay: 'blur(4px)',
  },
  colors: {
    accentColor: 'hsl(275 60% 45%)', // --primary
    accentColorForeground: 'hsl(280 25% 95%)', // --primary-foreground
    actionButtonBorder: 'hsl(260 20% 25%)', // --border
    actionButtonBorderMobile: 'hsl(260 20% 25%)',
    actionButtonSecondaryBackground: 'hsl(260 20% 12%)', // --card
    closeButton: 'hsl(280 20% 92%)', // --foreground
    closeButtonBackground: 'hsl(260 20% 12%)',
    connectButtonBackground: 'hsl(260 25% 8%)', // --background
    connectButtonBackgroundError: 'hsl(0 70% 55%)', // --destructive
    connectButtonInnerBackground: 'hsl(275 60% 45%)', // --primary
    connectButtonText: 'hsl(280 25% 95%)',
    connectButtonTextError: 'hsl(280 25% 95%)',
    connectionIndicator: 'hsl(180 100% 50%)', // --accent
    downloadBottomCardBackground: 'hsl(260 20% 12%)',
    downloadTopCardBackground: 'hsl(260 25% 8%)',
    error: 'hsl(0 70% 55%)', // --destructive
    generalBorder: 'hsl(260 20% 25%)', // --border
    generalBorderDim: 'hsl(260 15% 18%)',
    menuItemBackground: 'hsl(260 20% 12%)',
    modalBackdrop: 'rgba(0, 0, 0, 0.8)',
    modalBackground: 'hsl(260 25% 8%)', // --background
    modalBorder: 'hsl(260 20% 25%)', // --border
    modalText: 'hsl(280 20% 92%)', // --foreground
    modalTextDim: 'hsl(280 10% 60%)', // --muted-foreground
    modalTextSecondary: 'hsl(280 15% 88%)', // --card-foreground
    profileAction: 'hsl(260 20% 12%)', // --card
    profileActionHover: 'hsl(260 15% 18%)', // --muted
    profileForeground: 'hsl(260 25% 10%)', // --popover
    selectedOptionBorder: 'hsl(275 60% 45%)', // --primary
    standby: 'hsl(275 80% 65%)', // --primary-glow
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
  radii: {
    actionButton: '0.75rem',
    connectButton: '0.75rem',
    menuButton: '0.75rem',
    modal: '0.75rem',
    modalMobile: '0.75rem',
  },
  shadows: {
    connectButton: '0 0 30px hsl(275 80% 65% / 0.3)', // --shadow-glow
    dialog: '0 8px 32px hsl(260 40% 5% / 0.6)', // --shadow-card
    profileDetailsAction: '0 0 20px hsl(180 100% 70% / 0.2)',
    selectedOption: '0 0 20px hsl(275 60% 45% / 0.3)',
    selectedWallet: '0 0 30px hsl(275 60% 45% / 0.3)',
    walletLogo: '0 0 20px hsl(180 100% 50% / 0.4)', // --shadow-sigil
  },
};