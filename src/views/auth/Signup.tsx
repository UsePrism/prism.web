import InputField from "core/components/formfields/InputField";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="mx-auto mb-8 w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div>
          <h3 className="text-black-main text-[24px] font-semibold">
            Create Account
          </h3>
          <p className="text-black-support text-[16px]">
            Enter your details to create an account.
          </p>

          <form className="my-[28px]">
            <div className="mb-3 flex gap-5">
              <div className="w-1/2">
                <InputField
                  extra=""
                  label="First Name"
                  name="firstname"
                  id="firstName"
                  type="text"
                  value=""
                  onChange={() => {}}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  extra=""
                  label="Last Name"
                  name="lastname"
                  id="lastName"
                  type="text"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>
            <InputField
              extra="mb-3"
              label="Email Address"
              name="email"
              id="email"
              type="email"
              placeholder="Email Address"
              value=""
              onChange={() => {}}
            />
            <InputField
              extra="mb-3"
              label="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
              type="text"
              placeholder="09000000000"
              value=""
              onChange={() => {}}
            />
            <InputField
              extra="mb-3"
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="*******"
              value=""
              onChange={() => {}}
            />
            <button className="text-brand-white bg-brand mt-3 w-full rounded-[8px] py-[14px]">
              Create Account
            </button>
          </form>

          <div>
            <p className="text-center font-medium">
              <span className="mr-2">Already have an account?</span>
              <Link to="/auth/login" className="text-brand">
                Sign In
              </Link>
            </p>
          </div>

          <p className="mt-[28px] text-center">
            By clicking on &quot;Create Account&quot; &#44; you have agreed{" "}
            <br />
            to our{" "}
            <Link to="/terms" className="text-green underline">
              Terms &amp; Conditions.
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
