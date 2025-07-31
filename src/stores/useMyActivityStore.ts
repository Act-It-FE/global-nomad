import { create } from 'zustand';

interface MyActivityState {
  currentUserId: number | null;
  activityOwnerId: number | null;
  setCurrentUserId: (id: number) => void;
  setActivityOwnerId: (id: number) => void;
  isMyActivity: () => boolean;
}

export const useMyActivityStore = create<MyActivityState>((set, get) => ({
  currentUserId: null,
  activityOwnerId: null,

  setCurrentUserId: (id: number) => set({ currentUserId: id }),
  setActivityOwnerId: (id: number) => set({ activityOwnerId: id }),

  isMyActivity: () => {
    const { currentUserId, activityOwnerId } = get();
    return currentUserId !== null && currentUserId === activityOwnerId;
  },
}));
