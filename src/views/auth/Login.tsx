import InputField from "core/components/formfields/InputField";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div>
          <h3 className="text-[24px] font-semibold text-black-main">Login</h3>
          <p className="text-[16px] text-black-support">
            Enter your details to login to your account.
          </p>

          <form className="my-[16px]">
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
            <div className="mb-[10px]">
              <InputField
                extra="mb-[2px]"
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
