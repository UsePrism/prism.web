/* eslint-disable no-template-curly-in-string */
import { caretright } from "core/consts/images";
import { useParams } from "react-router-dom";

const Businesses = () => {
  const { businessId } = useParams();

  console.log(businessId);

  return (
    <div className="m-[0px] pt-[20px]">
      <section className="mx-auto flex h-full w-11/12 items-center overflow-hidden md:w-4/5">
        <header className="flex items-center">
          <span>Home</span>
          <img src={caretright} alt="" loading="lazy" />
          <span>Businesses</span>
          <img src={caretright} alt="" loading="lazy" />
          <span className="text-white">Burger King</span>
        </header>
      </section>
    </div>
  );
};

export default Businesses;
