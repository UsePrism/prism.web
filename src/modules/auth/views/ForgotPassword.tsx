import InputField from "core/components/formfields/InputField";
import notification from "core/helpers/notification";
import useUserStore from "core/services/stores/useUserStore";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const resetPasswordRequestAction = useUserStore(
    (store) => store.resetPasswordRequest,
  );

  const [email, setEmail] = useState("");

  const resetPasswordRequest = async (e: any) => {
    e.preventDefault();

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      var res = await resetPasswordRequestAction(email);

      if (res?.status) {
        setEmail("");
      }
    } else {
      notification({
        title: "",
        type: "danger",
        message: "A valid Email address is required",
      });
    }
  };

  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/3">
          <h3 className="text-[24px] font-[600] text-white">
            Forgot Password?
          </h3>
          <p className="text-[16px]">
            Input your email address, we will send an otp <br /> input the code
            below to continue.
          </p>
          <form className="my-[32px]" onSubmit={resetPasswordRequest}>
            <InputField
              boxStyle="mb-[16px]"
              label="Email Address"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e: any) => setEmail(e?.target?.value)}
            />
            <button className="mt-[16px] w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
              Reset Password
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

export default ForgotPassword;
