import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserProfile } from '@/api/types/auth';

export interface UserState {
  user: UserProfile | null;
  setUser: (u: UserProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
