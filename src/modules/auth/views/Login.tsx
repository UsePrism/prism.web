import InputField from "core/components/formfields/InputField";
import notification from "core/helpers/notification";
import useUserStore from "core/services/stores/useUserStore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loginAction = useUserStore((store) => store.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>([]);

  const validateLoginInfo = (email: string, password: string) => {
    var isValid = true;

    if (password?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        Password: [
          {
            errorMessage: "Password is required",
          },
        ],
      }));
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((state: any) => ({
        ...state,
        Email: [{ errorMessage: "A valid Email address is required" }],
      }));
      isValid = false;
    }

    return isValid;
  };

  const login = async (e: any) => {
    e.preventDefault();

    if (validateLoginInfo(email, password)) {
      var res = await loginAction(email, password);

      if (res?.status) {
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setErrors({ ...res?.errors });

        if (res?.message?.includes("confirm your email")) {
          navigate(`/auth/verify-account?email=${encodeURIComponent(email)}`);
        }
      }
    } else {
      notification({
        title: "",
        message: "Please pass all required information",
        type: "danger",
      });
    }
  };

  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/3">
          <h3 className="text-[24px] font-[600] text-white">Login</h3>
          <p className="text-[16px] text-line">
            Enter your details to login to your account.
          </p>

          <form className="my-[32px]" onSubmit={login}>
            <div className="mb-[16px] flex gap-[16px]">
              <div className="w-full">
                <InputField
                  isRequired
                  label="Email Address"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e?.target?.value);
                  }}
                  errors={errors?.Email}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      Email: "",
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-[10px] w-full">
              <InputField
                isRequired
                boxStyle="mb-[2px] w-full"
                label="Password"
                name="password"
                type="password"
                placeholder="*******"
                value={password}
                errors={errors?.Password}
                onChange={(e: any) => {
                  setPassword(e?.target?.value);
                }}
                onBlur={() =>
                  setErrors((state: any) => ({
                    ...state,
                    Password: "",
                  }))
                }
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
            <p className="text-center">
              <span className="mr-2">Don't remember your password?</span>
              <Link to="/auth/forgot-password" className="text-brand">
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
