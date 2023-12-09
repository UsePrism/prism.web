import InputField from "core/components/formfields/InputField";
import { caretdown, nigeria } from "core/consts/images";
import { Link } from "react-router-dom";

const Signup = () => {
  // TODO: Add hermet seo
  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div>
          <h3 className="text-whote text-[24px] font-[600]">Create Account</h3>
          <p className="text-[16px]">
            Enter your details to create an account.
          </p>

          <form className="my-[32px]">
            <div className="mb-[16px] flex gap-[16px]">
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
              extra="mb-[16px]"
              label="Email Address"
              name="email"
              id="email"
              type="email"
              placeholder="Email Address"
              value=""
              onChange={() => {}}
            />
            <div className="mb-[16px]">
              <label className={`text-[14px] text-line`}>Phone Number</label>
              <div className="flex items-center gap-[16px]">
                <div className="mt-2 flex w-1/4 cursor-not-allowed items-center gap-1 py-3 md:gap-2">
                  <img src={nigeria} alt="" loading="lazy" />
                  <span className="text-[16px]">+234</span>
                  <img src={caretdown} alt="" loading="lazy" />
                </div>
                <InputField
                  extra="w-3/4"
                  label="Phone Number"
                  name="phoneNumber"
                  id="phoneNumber"
                  showLabel={false}
                  type="text"
                  placeholder="09000000000"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>
            <InputField
              extra="mb-[16px]"
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="*******"
              value=""
              onChange={() => {}}
            />
            <button className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
              Create Account
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

          <p className="mt-[32px] text-center text-[14px]">
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
