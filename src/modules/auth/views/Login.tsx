import InputField from "core/components/formfields/InputField";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div className="w-full sm:w-auto">
          <h3 className="text-[24px] font-[600] text-white">Login</h3>
          <p className="text-[16px] text-line">
            Enter your details to login to your account.
          </p>

          <form className="my-[32px]">
            <div className="mb-[16px] flex gap-[16px]">
              <div className="w-full">
                <InputField
                  extra=""
                  label="Email Address"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="mb-[10px] w-full">
              <InputField
                extra="mb-[2px] w-full"
                label="Password"
                name="password"
                id="password"
                type="password"
                placeholder="*******"
                value=""
                onChange={() => {}}
              />
              <div className="text-right">
                <Link
                  to="/auth/forgot-password"
                  className="text-[14px] text-brand"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
              Login to your account
            </button>
          </form>

          <div>
            <p className="text-center">
              <span className="mr-2">Don't have an account?</span>
              <Link to="/auth/signup" className="text-brand">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
