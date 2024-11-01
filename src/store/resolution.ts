import { create } from "zustand";
import { Resolution } from "../types/resolution";

interface ResolutionStore {
  resolutions: Resolution[];
  currentResolution: Resolution | null;
  setResolutions: (resolutions: Resolution[]) => void;
  setCurrentResolution: (resolution: Resolution | null) => void;
  updateResolution: (updatedResolution: Resolution) => void;
}

export const useResolutionStore = create<ResolutionStore>((set) => ({
  resolutions: [],
  currentResolution: null,
  setResolutions: (resolutions) => set({ resolutions }),
  setCurrentResolution: (resolution) => set({ currentResolution: resolution }),
  updateResolution: (updatedResolution) =>
    set((state) => ({
      resolutions: state.resolutions.map((r) =>
        r.id === updatedResolution.id ? updatedResolution : r
      ),
      currentResolution:
        state.currentResolution?.id === updatedResolution.id
          ? updatedResolution
          : state.currentResolution,
    })),
}));
