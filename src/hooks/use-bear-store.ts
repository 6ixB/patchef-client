/*
Example of a simple store using Zustand.
This store has a single state variable, bears, and a single action, increase, which increments the bears variable by a given amount.
*/

import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
