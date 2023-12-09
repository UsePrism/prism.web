import { clock } from "core/consts/images";
import { otpBox, otpInput } from "core/consts/styling";
import { useState } from "react";
import OTPInput from "react-otp-input";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("-----");

  return (
    <div className="!md:w-4/5 mx-auto mb-8 mt-[40px] !w-11/12">
      <section className="flex items-center justify-center">
        <div>
          <h3 className="text-[24px] font-[600] text-white">
            Account Verification
          </h3>
          <p className="text-[16px]">
            We have sent an OTP to your email address, <br /> input the code
            below to continue.
          </p>
          <form className="my-[32px]">
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
            <button className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
              Verify
            </button>
          </form>
          <div className="flex justify-center gap-2">
            <span>You can resend in</span>
            <img
              src={clock}
              alt="clock"
              className="h-[25px] w-[25px]"
              loading="lazy"
            />
            <span>00:00</span>
          </div>
          <div className="mt-[16px] text-center">
            <button className="text-[14px] font-[500] text-brand">
              Resend Code
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyAccount;
