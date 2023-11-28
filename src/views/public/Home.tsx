import { lightAccent } from "core/consts/images";
import { useState } from "react";
import user from "assets/img/user.svg";
import { reverse } from "dns";
import { renderStars } from "core/services/helpers";

const Home = () => {
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      user: "Chioma",
      business: "Jumia",
      review:
        "Fast and reliable delivery service. I've been using Jumia for years and have never had a problem.",
    },
    {
      rating: 4.5,
      user: "Adedayo",
      business: "Interswitch",
      review:
        "Innovative payment solutions provider. Interswitch has made it easy to pay for goods and services online and offline.",
    },
    {
      rating: 4,
      user: "Femi",
      business: "Flutterwave",
      review:
        "Secure and convenient payment platform. Flutterwave is a great option for making online payments.",
    },
    {
      rating: 5,
      user: "Ngozi",
      business: "Paystack",
      review:
        "Easy-to-use payment gateway. Paystack is a great choice for businesses of all sizes.",
    },
    {
      rating: 4.5,
      user: "Uche",
      business: "VoguePay",
      review:
        "Reliable and affordable payment processing services. VoguePay is a good option for businesses that need a cost-effective payment solution.",
    },
    {
      rating: 5,
      user: "Oluwatoyin",
      business: "GTPay",
      review:
        "Innovative payment solutions tailored for the Nigerian market. GTPay is a great choice for businesses that want to offer their customers a variety of payment options.",
    },
  ]);

  return (
    <div className="m-[0px]">
      <section className="h-[85vh] bg-black">
        <div className="relative mx-auto flex h-full w-11/12 justify-end overflow-hidden md:w-4/5">
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center text-white md:w-4/5 lg:w-3/5">
            <div className="text-[32px] font-[600] md:text-[48px]">
              <p className="leading-tight">
                <span className="text-brand">Find</span> reliable businesses
              </p>
              <p className="leading-tight">
                <span className="text-brand">Discover</span> honest feedback
              </p>
              <p className="leading-tight">
                <span className="text-brand">Share</span> your experiences
              </p>
            </div>
            <form className="my-[48px] flex w-full md:w-4/5">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="what business are you looking for?"
                className="flex h-12 w-9/12 items-center justify-center rounded-l-[5px] border border-[1px] border-line bg-brand-white p-3 text-sm outline-none"
              />
              <button className="w-3/12 rounded-r-[5px] bg-brand px-5 py-3">
                Search
              </button>
            </form>
          </div>
          <div className="h-full w-full md:w-[85%]">
            <img src={lightAccent} alt="" className="h-full w-full" />
          </div>
        </div>
      </section>
      <section className="mx-auto w-11/12 overflow-hidden py-[60px] md:w-4/5">
        <div className="mb-[28px] w-full text-center">
          <h3 className="w-full text-[24px] text-[32px] font-[600]">
            Latest Reviews
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews &&
            reviews?.length > 0 &&
            reviews.map((review: any, index: number) => (
              <div key={index} className="bg-[#F9FAFB] p-5">
                <img src={user} alt="user" />
                <div className="my-3 flex">{renderStars(review?.rating)}</div>
                <p className="mb-[12px]">
                  <span className="font-[500]">{review?.user}</span>
                  <span className="mx-1">reviewed</span>
                  <span className="font-[500]">{review?.business}</span>
                </p>
                <p>{review?.review}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
