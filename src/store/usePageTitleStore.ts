import { create } from "zustand";

type PageTitleStore = {
  title: string;
  setTitle: (newTitle: string) => void;
};

export const usePageTitleStore = create<PageTitleStore>((set) => ({
  title: "",
  setTitle: (newTitle) => set({ title: newTitle }),
}));
