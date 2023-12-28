import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  changePassword,
  login,
  resetPassword,
  resetPasswordRequest,
  sendOtp,
  signUp,
  verifyEmail,
} from "../api/authapi";
import notification from "core/helpers/notification";
import { handleApiResponse } from "core/helpers/generalHelpers";

type UserState = {
  isLoading: boolean;
  signup: (newUser: NewUser) => Promise<GeneralResponse>;
  login: (email: string, password: string) => Promise<GeneralResponse>;
  verifyEmail: (email: string, otp: string) => Promise<GeneralResponse>;
  sendOtp: (email: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<GeneralResponse>;
  resetPasswordRequest: (email: string) => Promise<GeneralResponse>;
  resetPassword: (resetDetail: ResetPasswordDetail) => Promise<GeneralResponse>;
  reset: () => void;
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get): UserState => ({
        isLoading: false,
        changePassword: async (currentPassword, newPassword) => {
          set({ isLoading: true });
          const apiRes = await changePassword(currentPassword, newPassword);

          var res = handleApiResponse(apiRes);

          notification({
            message: res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        login: async (email, password) => {
          set({ isLoading: true });
          const apiRes = await login(email, password);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        resetPassword: async (resetDetail) => {
          set({ isLoading: true });
          const apiRes = await resetPassword(resetDetail);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        resetPasswordRequest: async (email) => {
          set({ isLoading: true });
          const apiRes = await resetPasswordRequest(email);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.data?.data?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        sendOtp: async (email) => {
          set({ isLoading: true });
          const apiRes = await sendOtp(email);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return;
        },
        signup: async (newUser) => {
          set({ isLoading: true });
          const apiRes = await signUp(newUser);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        verifyEmail: async (email, otp) => {
          set({ isLoading: true });
          const apiRes = await verifyEmail(email, otp);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.message,
            type: res?.status ? "success" : "danger",
          });
          set({ isLoading: false });
          return res;
        },
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
