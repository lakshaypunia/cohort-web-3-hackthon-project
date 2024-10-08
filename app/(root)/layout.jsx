"use client"
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
 
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');


export default function RootLayout({ children }) {
  const network = WalletAdapterNetwork.Devnet;
 
    // You can also provide a custom RPC endpoint.
    const endpoint = "https://solana-devnet.g.alchemy.com/v2/bnLY9Bja8m2B5WCaP_KPMrfZR10PaMVZ";
 
    const wallets = useMemo(
        () => [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );
  return (
      <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  {children}
                  </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  );
}