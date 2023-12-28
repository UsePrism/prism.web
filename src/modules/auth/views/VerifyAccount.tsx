import { clock } from "core/consts/images";
import { otpBox, otpInput } from "core/consts/styling";
import notification from "core/helpers/notification";
import useUserStore from "core/services/stores/useUserStore";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email: any = searchParams.get("email");

  const verifyEmailAction = useUserStore((store) => store.verifyEmail);
  const sendOtpAction = useUserStore((store) => store.sendOtp);

  const [otp, setOtp] = useState("");

  const verifyEmail = async (e: any) => {
    e.preventDefault();

    if (otp?.length === 5) {
      var res = await verifyEmailAction(email, otp);

      if (res?.status) {
        navigate("/auth/login");
      }
    } else {
      notification({
        title: "",
        message: "The length of 'Otp' must be 5 characters",
        type: "danger",
      });
    }
  };

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
          <form className="my-[32px]" onSubmit={verifyEmail}>
            <OTPInput
              value={otp}
              placeholder="-----"
              onChange={setOtp}
              inputType="tel"
              numInputs={5}
              renderSeparator={<span></span>}
              renderInput={(props: any) => <input {...props} />}
              containerStyle={otpBox}
              inputStyle={otpInput}
            />
            <button
              className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white disabled:cursor-not-allowed"
              disabled={otp?.length !== 5}
            >
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
          <div>
            <p className="text-center">
              <span className="mr-2">Already have an account?</span>
              <Link to="/auth/login" className="text-brand">
                Sign In
              </Link>
            </p>
          </div>
          <div className="mt-[16px] text-center">
            <button
              onClick={() => email?.length > 0 && sendOtpAction(email)}
              className="text-[14px] font-[500] text-brand"
            >
              Resend Code
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyAccount;
