/* eslint-disable no-template-curly-in-string */
import { useState } from "react";
import user from "assets/img/user.png";
import { getCatgories, renderStars } from "core/helpers/renderStars";
import { Link } from "react-router-dom";
import { btn } from "core/consts/styling";
import InputField from "core/components/formfields/InputField";

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

  const categories = getCatgories();

  return (
    <div className="m-[0px]">
      <section className="bg-accent h-[85vh] bg-black">
        <div className="mx-auto flex h-full w-11/12 items-center overflow-hidden md:w-4/5">
          <div className="mx-auto flex h-full w-full flex-col  items-center justify-center text-white md:w-4/5 lg:w-3/5">
            <div className="text-center text-[18px] font-[600] sm:text-[32px] md:text-[48px]">
              <p className="leading-tight">
                <span className="text-brand">Discover</span> honest feedback
              </p>
              <p className="leading-tight">
                <span className="text-brand">Share</span> your experiences
              </p>
              <p className="leading-tight">
                <span className="text-brand">Connect</span> with reliable
                businesses
              </p>
            </div>
            <form className="my-[48px] flex flex w-full flex-col items-center gap-3 md:w-4/5 md:flex-row">
              <InputField
                extra="w-full md:w-9/12"
                label=""
                showLabel={false}
                placeholder="what business are you looking for?"
                name="search"
                id="search"
                type="text"
                value=""
                onChange={() => {}}
              />
              <button className="mt-2 w-1/2 rounded-[5px] bg-brand px-4 py-3 md:w-3/12">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="mx-auto w-11/12 overflow-hidden py-[60px] md:w-4/5">
        <div className="mb-[28px] w-full text-center">
          <h3 className="w-full text-[24px] text-[32px] font-[600] text-white">
            Latest Reviews
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews &&
            reviews?.length > 0 &&
            reviews.map((review: any, index: number) => (
              <div key={index} className="rounded-[5px] bg-shade p-5">
                <img src={user} alt="user" loading="lazy" />
                <div className="my-3 flex items-center gap-2">
                  <div className="flex">{renderStars(review?.rating)}</div>
                  <span>{review?.rating}</span>
                </div>
                <p className="mb-[12px]">
                  <span className="font-[600] text-white">{review?.user}</span>
                  <span className="mx-1">reviewed</span>
                  <span className="font-[600] text-white">
                    {review?.business}
                  </span>
                </p>
                <p>{review?.review}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="bg-shade">
        <div className="mx-auto flex w-11/12 flex-col items-center justify-center gap-5 overflow-hidden py-[55px] sm:flex-row md:w-4/5">
          <h3 className="font-[600 text-[24px] text-white">
            Are you a business?
          </h3>
          <button
            className={`${btn} border-1 border border-brand bg-brand !text-[18px]  text-white`}
          >
            Join Our Waitlist
          </button>
        </div>
      </section>

      <div className="bg-sideaccent">
        <section className="mx-auto w-11/12 overflow-hidden py-[60px] md:w-4/5">
          <div className="mb-[28px] w-full text-center">
            <h3 className="w-full text-[24px] text-[32px] font-[600]">
              Browse through Categories
            </h3>
          </div>
          <div className="flex snap-mandatory flex-nowrap gap-5 overflow-x-auto md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
            {categories &&
              categories?.length > 0 &&
              categories.map((category: any, index: number) => (
                <div
                  key={index}
                  className="flex w-auto flex-none snap-center snap-always items-center gap-5 rounded-[5px] bg-shade p-3 md:w-auto md:p-5"
                >
                  <img src={category?.icon} alt="" loading="lazy" />
                  <p className="text-wrap text-[14px] font-[500]">
                    {category?.name}
                  </p>
                </div>
              ))}
          </div>
          <div className="my-[34px] flex w-full justify-center">
            <Link
              to="/categories"
              className={`${btn} border-1 border border-brand bg-brand !text-[18px] text-white`}
            >
              View more
            </Link>
          </div>
        </section>

        <section className="bg-brandImg relative h-[85vh]">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#220372] opacity-70"></div>
          <div className="absolute left-0 top-0 z-50 h-full w-full">
            <div className="mx-auto flex h-full w-11/12 flex-col justify-center overflow-hidden py-[60px] md:w-4/5">
              <div className="w-full text-white md:w-2/3 lg:w-1/2">
                <h5 className="mb-[24px] text-[32px] font-[600]">
                  Great? Poor? or a bit <br /> meh? Let us know
                </h5>
                <p className="md:w-2/2 mb-16 w-full">
                  Your reviews help other people to shop safely and confidently,
                  without the fear of buying poor quality products and services,
                  or being defrauded.
                </p>
                <Link
                  to="/reviews"
                  className={`${btn} border-1   w-auto border border-[#F9F5FF] bg-[#F9F5FF] !py-[12px] !text-[18px] text-brand md:w-2/3`}
                >
                  Review a Business
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="relative h-[85vh] bg-white">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-white opacity-70"></div>
          <div className="absolute left-0 top-0 z-50 h-full w-full">
            <div className="mx-auto flex h-full w-11/12 flex-col items-end justify-center overflow-hidden py-[60px] md:w-4/5">
              <div className="w-full text-black md:w-4/5 lg:w-1/2">
                <h5 className="mb-[24px] text-[32px] font-[600]">
                  Read authentic reviews <br /> from real people
                </h5>
                <p className="mb-16 w-full">
                  We spotlight businesses by pooling the feedback of customers
                  to show you the experiences of people who have shopped there.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-yellowImg relative h-[85vh]">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-[#C56A00] opacity-[.86]"></div>
          <div className="absolute left-0 top-0 z-50 h-full w-full">
            <div className="mx-auto flex h-full w-11/12 flex-col justify-center overflow-hidden py-[60px] md:w-4/5">
              <div className="w-full text-white md:w-2/3 lg:w-1/2">
                <h5 className="mb-[24px] text-[32px] font-[600]">
                  Beat the suspicion with <br /> feedback from customers
                </h5>
                <p className="md:w-2/2 mb-16 w-full">
                  Collect feedback from your customers and showcase on your
                  website or social media to help new customers confidently shop
                  from you.
                </p>
                <Link
                  to="/auth/signup"
                  className={`${btn} border-1   w-auto border border-[#001219] bg-[#001219] !py-[12px] !text-[18px] text-brand-white lg:w-2/3`}
                >
                  Create your Business
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
