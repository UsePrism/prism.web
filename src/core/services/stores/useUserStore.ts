import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { signUp } from "../api/authapi";
import notification from "core/helpers/notification";
import { groupError } from "core/helpers/generalHelpers";

type UserState = {
  isLoading: boolean;
  signup: (newUser: NewUser) => Promise<GeneralResponse>;
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
        signup: async (newUser) => {
          set({ isLoading: true });

          const apiRes = await signUp(newUser);

          var response: GeneralResponse = {
            data: null,
            errors: {},
            status: false,
          };

          if (apiRes?.status === 200) {
            response.status = true;
          } else if (apiRes?.status === 400) {
            notification({
              type: "danger",
              message: apiRes?.data?.detail,
            });

            var errors = apiRes?.data?.errors;
            if (errors?.length > 0) {
              response.errors = groupError(errors);
            }
          } else {
            notification({
              type: "danger",
              message: apiRes?.data?.description,
            });
          }

          set({ isLoading: false });
          return response;
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
