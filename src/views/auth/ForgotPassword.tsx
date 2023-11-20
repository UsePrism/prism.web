import InputField from "core/components/formfields/InputField";
import { otpBox, otpInput } from "core/consts/styling";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("-----");

  return (
    <div className="!md:w-4/5 mx-auto mb-8 mt-[40px] !w-11/12">
      <section className="flex items-center justify-center">
        <div>
          <h3 className="text-[24px] font-semibold text-black-main">
            Forgot Password?
          </h3>
          <p className="text-[16px] text-black-support">
            Input your email address, we will send an otp <br /> input the code
            below to continue.
          </p>
          <form className="my-[32px]">
            <InputField
              extra="mb-[16px]"
              label="Email Address"
              name="email"
              id="email"
              type="email"
              placeholder="Email Address"
              value=""
              onChange={() => {}}
            />
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="otp"
                  className={`text-brand-support text-[14px]`}
                >
                  OTP
                </label>
                <button className="text-[14px] font-[500] text-brand">
                  Resend Code
                </button>
              </div>
              <OTPInput
                value={otp}
                onChange={setOtp}
                inputType="tel"
                numInputs={5}
                renderSeparator={<span></span>}
                renderInput={(props: any) => <input {...props} />}
                containerStyle={otpBox}
                inputStyle={otpInput}
              />
            </div>
            <button className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
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

export default ForgotPassword;
