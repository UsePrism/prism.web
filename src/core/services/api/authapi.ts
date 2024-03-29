import { apicall } from "./apicall";

export const login = (email: string, password: string) => {
  return apicall({
    endpoint: "/auth/login",
    method: "POST",
    body: {
      email,
      password,
    },
  });
};

export const googleLogin = (token: string) => {
  return apicall({
    endpoint: "/auth/google-login",
    method: "POST",
    body: {
      idToken: token,
    },
  });
};

export const signUp = (newUser: NewUser) => {
  return apicall({
    endpoint: "/onboarding/sign-up",
    method: "POST",
    body: { ...newUser },
  });
};

export const verifyEmail = (email: string, otp: string) => {
  return apicall({
    endpoint: "/onboarding/email-validation",
    method: "POST",
    body: {
      email,
      otp,
    },
  });
};

export const sendOtp = (email: string) => {
  return apicall({
    endpoint: "/onboarding/resend-otp",
    method: "POST",
    body: {
      email,
    },
  });
};

// Password reset
export const changePassword = (
  currentPassword: string,
  newPassword: string,
) => {
  return apicall({
    endpoint: "/password/change",
    method: "POST",
    body: {
      currentPassword,
      newPassword,
    },
  });
};

export const resetPasswordRequest = (email: string) => {
  return apicall({
    endpoint: "/password/reset-request",
    method: "POST",
    body: {
      email,
    },
  });
};

export const resetPassword = (resetDetail: ResetPasswordDetail) => {
  return apicall({
    endpoint: "/password/reset",
    method: "POST",
    pQuery: { userId: resetDetail?.userId, token: resetDetail?.token },
    body: {
      newPassword: resetDetail?.newPassword,
      confirmNewPassword: resetDetail?.confirmNewPassword,
    },
  });
};

export const joinWaitlist = (waitlist: Waitlist) => {
  return apicall({
    endpoint: "/waitlist",
    method: "POST",
    body: { ...waitlist },
  });
};
