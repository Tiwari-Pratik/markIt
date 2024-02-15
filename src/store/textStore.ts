import { create } from "zustand";

interface TextStore {
  text: string;
  updateText: (editedText: string) => void;
}

const useTextStore = create<TextStore>()((set) => ({
  text: "",
  updateText: (editedText: string) => set(() => ({ text: editedText })),
}));

export default useTextStore;
