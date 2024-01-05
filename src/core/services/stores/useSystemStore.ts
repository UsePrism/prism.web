import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SystemState = {
  showWaitListModal: boolean;
  toggleWaitListModal: (isOpen: boolean) => void;
};

const useSystemStore = create<SystemState>()(
  devtools(
    persist(
      (set, get): SystemState => ({
        showWaitListModal: false,
        toggleWaitListModal: (isOpen) => {
          set({ showWaitListModal: isOpen });
        },
      }),
      {
        name: "systemstore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default useSystemStore;
