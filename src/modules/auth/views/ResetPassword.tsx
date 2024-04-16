import InputField from "core/components/formfields/InputField";
import notification from "core/helpers/notification";
import useUserStore from "core/services/stores/useUserStore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId: any = searchParams.get("userId");
  const token: any = searchParams.get("amp;token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState<any>([]);
  const resetPasswordAction = useUserStore((store) => store.resetPassword);

  const validateResetInfo = (
    newPassword: string,
    confirmNewPassword: string,
  ) => {
    var isValid = true;

    if (newPassword?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        NewPassword: [
          {
            errorMessage: "New Password is required",
          },
        ],
      }));
      isValid = false;
    }

    if (confirmNewPassword?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        ConfirmNewPassword: [
          {
            errorMessage: "Confirm New Password is required",
          },
        ],
      }));
      isValid = false;
    }

    if (confirmNewPassword !== newPassword) {
      setErrors((state: any) => ({
        ...state,
        ConfirmNewPassword: [
          {
            errorMessage: "Password must be the same",
          },
        ],
      }));
      isValid = false;
    }

    return isValid;
  };

  const resetPassword = async (e: any) => {
    e.preventDefault();

    if (validateResetInfo(newPassword, confirmNewPassword)) {
      var res = await resetPasswordAction({
        confirmNewPassword,
        newPassword,
        token,
        userId,
      });

      if (res?.status) {
        setNewPassword("");
        setConfirmNewPassword("");

        navigate("/auth/login");
      } else {
        setErrors({ ...res?.errors });
      }
    } else {
      notification({
        title: "",
        message: "Please pass all required information",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    if (
      token == null ||
      userId == null ||
      token?.length < 1 ||
      userId?.length < 1
    ) {
      navigate("/auth/login");
    }
  });

  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/3">
          <h3 className="text-[24px] font-[600] text-white">Reset Password?</h3>
          <p className="text-[16px]">
            Input your email address, we will send an otp <br /> input the code
            below to continue.
          </p>
          <form className="my-[32px]" onSubmit={resetPassword}>
            <InputField
              isRequired
              boxStyle="mb-[16px]"
              label="New Password"
              name="newPassword"
              type="password"
              isPassword
              value={newPassword}
              onChange={(e: any) => {
                setNewPassword(e?.target?.value);
              }}
              errors={errors?.NewPassword}
              onBlur={() =>
                setErrors((state: any) => ({
                  ...state,
                  NewPassword: "",
                }))
              }
            />{" "}
            <InputField
              isRequired
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              isPassword
              value={confirmNewPassword}
              onChange={(e: any) => {
                setConfirmNewPassword(e?.target?.value);
              }}
              errors={errors?.ConfirmNewPassword}
              onBlur={() =>
                setErrors((state: any) => ({
                  ...state,
                  ConfirmNewPassword: "",
                }))
              }
            />{" "}
            <button className="mt-[16px] w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
              Change Password
            </button>
          </form>

          <div>
            <p className="text-center">
              <span className="mr-2">Already have an account?</span>
              <Link to="/auth/login" className="text-brand">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
