/* eslint-disable no-template-curly-in-string */
import { Link } from "react-router-dom";
import caretright from "assets/img/caretright.svg";
import { addMetaData } from "core/helpers/seoHelpers";
import { btn } from "core/consts/styling";

const PageNotFound = () => {
  return (
    <>
      {/* TODO: Update meta data */}
      {addMetaData({
        title: "",
        description: "",
      })}

      <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
        <section className="mb-[28px]">
          <header className="flex flex-wrap items-center text-[14px]">
            <Link to="/">Home</Link>
            <img src={caretright} alt="" loading="lazy" />
            <p className="text-white">404</p>
          </header>
        </section>
        <section>
          <h1 className="mb-[18px] font-[600] text-white">PAGE NOT FOUND</h1>
          <p>The page you are looking for does not exist</p>

          <Link
            to="/businesses"
            className={`mt-10 w-1/2 bg-brand !py-4 text-white md:w-1/3 lg:w-1/5 ${btn}`}
          >
            Explore Prism
          </Link>
        </section>
      </div>
    </>
  );
};

export default PageNotFound;
