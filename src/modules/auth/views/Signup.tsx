import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "core/components/formfields/InputField";
import useUserStore from "core/services/stores/useUserStore";
import notification from "core/helpers/notification";

const Signup = () => {
  const navigate = useNavigate();

  const signupAction = useUserStore((store) => store.signup);

  // TODO: Add hermet seo
  const [newUser, setNewUser] = useState<NewUser>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  const [newUserError, setNewUserError] = useState<any>({});

  const clearError = (name?: string) => {
    if (name == null || name?.length < 1) {
      setNewUserError({});
    } else {
      setNewUserError((state: any) => ({
        ...state,
        [name]: "",
      }));
    }
  };

  const validateNewUser = (data: NewUser) => {
    var isValid = true;
    if (data?.firstName?.length < 1) {
      setNewUserError((state: any) => ({
        ...state,
        FirstName: [{ errorMessage: "First name is required" }],
      }));
      isValid = false;
    }

    if (data?.lastName?.length < 1) {
      setNewUserError((state: any) => ({
        ...state,
        LastName: [{ errorMessage: "Last name is required" }],
      }));
      isValid = false;
    }

    if (
      data?.password?.length < 8 ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data?.password,
      )
    ) {
      setNewUserError((state: any) => ({
        ...state,
        Password: [
          {
            errorMessage:
              "The length of 'Password' must be at least 8 characters. Which must include an uppercase alphabet, special character and numbers",
          },
        ],
      }));
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.emailAddress)) {
      setNewUserError((state: any) => ({
        ...state,
        EmailAddress: [{ errorMessage: "A valid Email address is required" }],
      }));
      isValid = false;
    }

    return isValid;
  };

  const onFormChange = (event: any) => {
    const { name, value } = event?.target;
    setNewUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const signup = async (e: any) => {
    e.preventDefault();

    if (validateNewUser(newUser)) {
      var res = await signupAction({ ...newUser });

      const userEmail = newUser?.emailAddress;

      if (res?.status) {
        setNewUser({
          firstName: "",
          lastName: "",
          emailAddress: "",
          password: "",
        });
        navigate(`/auth/verify-account?email=${encodeURIComponent(userEmail)}`);
      } else {
        setNewUserError({ ...res?.errors });

        if (res?.message?.includes("verify your email")) {
          setNewUser({
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
          });
          navigate(
            `/auth/verify-account?email=${encodeURIComponent(userEmail)}`,
          );
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
          <h3 className="text-whote text-[24px] font-[600]">Create Account</h3>
          <p className="text-[16px]">
            Enter your details to create an account.
          </p>

          <form className="my-[32px]" onSubmit={signup}>
            <div className="mb-[16px] flex gap-[16px]">
              <div className="w-1/2">
                <InputField
                  isRequired
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={newUser?.firstName}
                  onChange={onFormChange}
                  errors={newUserError?.["FirstName"]}
                  onFocus={() => clearError("FirstName")}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  isRequired
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={newUser?.lastName}
                  onChange={onFormChange}
                  errors={newUserError?.["LastName"]}
                  onFocus={() => clearError("LastName")}
                />
              </div>
            </div>
            <InputField
              boxStyle="mb-[16px]"
              isRequired
              label="Email Address"
              name="emailAddress"
              placeholder="Email Address"
              value={newUser?.emailAddress}
              onChange={onFormChange}
              errors={newUserError?.["EmailAddress"]}
              onFocus={() => clearError("EmailAddress")}
            />
            {/*
            <div className="mb-[16px]">
              <label className={`text-[14px] text-line`}>Phone Number</label>
              <div className="mt-2 flex items-center gap-[16px]">
                <div className="flex w-1/4 cursor-not-allowed items-center gap-1 py-3 md:gap-2">
                  <img src={nigeria} alt="" loading="lazy" />
                  <span className="text-[16px]">+234</span>
                  <img src={caretdown} alt="" loading="lazy" />
                </div>
                <InputField
                  boxStyle="w-3/4"
                  name="phoneNumber"
                  id="phoneNumber"
                  type="text"
                  placeholder="09000000000"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>
            */}
            <InputField
              boxStyle="mb-[16px]"
              isRequired
              label="Password"
              name="password"
              type="password"
              placeholder="*******"
              value={newUser?.password}
              onChange={onFormChange}
              errors={newUserError?.["Password"]}
              onFocus={() => clearError("Password")}
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
            <Link to="/terms" className="text-green">
              Terms &amp; Conditions.
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
