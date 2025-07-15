import { create } from 'zustand';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface MediaState {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
}

const useMediaStore = create<MediaState>((set) => ({
  device: 'desktop', // 기본값은 데스크탑
  setDevice: (device) => set({ device }),
}));

export default useMediaStore;
