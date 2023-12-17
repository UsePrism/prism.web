import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type UserState = {};

const useUserStore = create<UserState>()(
  devtools(
    persist((set, get): UserState => ({}), {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

export default useUserStore;
