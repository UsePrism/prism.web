/* eslint-disable no-template-curly-in-string */
import { Link, useNavigate } from "react-router-dom";
import { caretright } from "core/consts/images";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
      <section className="mb-[28px]">
        <header className="flex items-center">
          <Link to="/">Home</Link>
          <img src={caretright} alt="" loading="lazy" />
          <p
            className="text-white"
          >
            Privacy Policy
          </p>
        </header>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
