import { useState, useEffect } from 'react';
import {
  initializeMarketplace,
  getUserProfile,
  connectWallet as connectWalletLib,
  disconnectWallet as disconnectWalletLib,
  purchaseItem as purchaseItemLib,
  hasItem as hasItemLib,
  type UserProfile,
} from '@/lib/marketplace';

export const useMarketplace = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    initializeMarketplace();
    loadUserProfile();
    
    // Listen for storage changes from other tabs
    const handleStorageChange = () => {
      loadUserProfile();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadUserProfile = () => {
    const profile = getUserProfile();
    setUserProfile(profile);
  };

  const connectWallet = () => {
    connectWalletLib();
    loadUserProfile();
  };

  const disconnectWallet = () => {
    disconnectWalletLib();
    loadUserProfile();
  };

  const purchaseItem = (itemId: string): boolean => {
    const success = purchaseItemLib(itemId);
    if (success) {
      loadUserProfile();
    }
    return success;
  };

  const hasItem = (itemId: string): boolean => {
    return hasItemLib(itemId);
  };

  return {
    userProfile,
    connectWallet,
    disconnectWallet,
    purchaseItem,
    hasItem,
    isLoggedIn: userProfile?.loggedIn || false,
  };
};
