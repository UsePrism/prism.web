import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { signUp } from "../api/authapi";

type UserState = {
  isLoading: boolean;
  signup: (newUser: NewUser) => boolean;
  login: (email: string, password: string) => void;
  verifyEmail: (email: string, otp: string) => void;
  sendOtp: (email: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
  resetPasswordRequest: (email: string) => void;
  resetPassword: (resetDetail: ResetPasswordDetail) => void;
  reset: () => void;
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get): UserState => ({
        isLoading: false,
        changePassword: (currentPassword, newPassword) => {},
        login: (email, password) => {},
        resetPassword: (resetDetail) => {},
        resetPasswordRequest: (email) => {},
        sendOtp: (email) => {},
        signup: (newUser) => {
          set({ isLoading: true });

          const res = signUp(newUser);

          set({ isLoading: false });
          return false;
        },
        verifyEmail: (email, otp) => {},
        reset: () => {
          set({
            isLoading: false,
          });
        },
      }),
      {
        name: "userStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default useUserStore;
