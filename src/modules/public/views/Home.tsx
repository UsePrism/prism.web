/* eslint-disable no-template-curly-in-string */
import { useState } from "react";
import user from "assets/img/user.png";
import { getCatgories, renderStars } from "core/helpers/renderStars";
import { Link } from "react-router-dom";
import { btn } from "core/consts/styling";
import InputField from "core/components/formfields/InputField";
import {
  chats,
  emptycards,
  searchIcon,
  userfeedbacks,
} from "core/consts/images";
import useSystemStore from "core/services/stores/useSystemStore";

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
  const toggleWaitListModal = useSystemStore(
    (store) => store.toggleWaitListModal,
  );

  return (
    <>
      <div className="m-[0px] pt-[-90px]">
        <section className="bg-accent h-[85vh] bg-black">
          <div className="mx-auto flex h-full w-11/12 items-center overflow-hidden md:w-4/5">
            <div className="mx-auto flex h-full w-full flex-col  items-center justify-center text-white md:w-4/5 lg:w-3/5">
              <div className="text-center text-[24px] font-[600] sm:text-[32px] md:text-[46px]">
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
              <form className="mt-[48px] flex flex w-full items-center gap-3 md:w-4/5">
                <InputField
                  boxStyle="w-9/12 md:w-9/12"
                  placeholder="What business are you looking for?"
                  name="search"
                  id="search"
                  type="text"
                  value=""
                  onChange={() => {}}
                />
                <button className="flex w-3/12 items-center justify-center rounded-[5px] bg-brand px-4 py-3 md:w-3/12">
                  <span className="hidden md:block">Search</span>
                  <img src={searchIcon} alt="" className="p-1 md:hidden" />
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
              reviews?.splice(0, 3)?.length > 0 &&
              reviews.map((review: any, index: number) => (
                <div key={index} className="rounded-[5px] bg-shade p-5">
                  <img src={user} alt="user" loading="lazy" />
                  <div className="my-3 flex items-center gap-2">
                    <div className="flex">{renderStars(review?.rating)}</div>
                    <span>{review?.rating}</span>
                  </div>
                  <p className="mb-[12px]">
                    <span className="font-[600] text-white">
                      {review?.user}
                    </span>
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
              className={`${btn} border-1 border border-brand bg-brand !text-[18px] text-white`}
              onClick={() => toggleWaitListModal(true)}
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
            <div className="grid w-full grid-flow-col grid-rows-2 gap-5 overflow-x-auto lg:grid-rows-3">
              {categories &&
                categories?.length > 0 &&
                categories.map((category: any, index: number) => (
                  <div
                    key={index}
                    className="flex !w-[250px] flex-none snap-center snap-always items-center gap-5 rounded-[5px] bg-shade p-3 md:w-1/2 md:w-auto md:p-5 lg:!w-auto"
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

          <section className="mx-auto w-11/12 overflow-hidden py-[60px] md:w-4/5">
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
              <div className="w-full md:w-1/2">
                <img
                  src={emptycards}
                  alt=""
                  className="h-auto w-auto"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="mb-[28px] text-center text-[24px] font-[600] text-white md:text-start">
                  Your reviews help other <br /> people to shop safely <br />
                  and confidently.
                </h3>
                <p className="mb-[28px] text-center md:text-start">
                  Going through a negative, or positive, experience with a
                  business gives you the insights needed to help others make
                  informed decisions.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto w-11/12 overflow-hidden py-[60px] md:w-4/5">
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row-reverse">
              <div className="flex w-full justify-center md:w-1/2">
                <img
                  src={chats}
                  alt=""
                  className="h-auto w-auto"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="mb-[28px] text-center text-[24px] font-[600] text-white md:text-start">
                  Great? Poor? or a bit <br />{" "}
                  <span className="italic">meh</span>? Let us know
                </h3>
                <p className="mb-[28px] text-center md:text-start">
                  Your reviews help other people to shop safely and confidently,
                  without the fear of buying poor quality products and services,
                  or being defrauded.
                </p>
                <div className="flex w-full justify-center md:justify-start">
                  <Link
                    to="/auth/login"
                    className={`${btn} border-1 border border-brand bg-brand !py-3 !text-[18px] text-white`}
                  >
                    Review a Business
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-11/12 overflow-hidden py-[60px] md:w-4/5">
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row-reverse">
              <div className="mt-[-30px] flex w-full justify-center md:w-1/2">
                <img
                  src={userfeedbacks}
                  alt=""
                  className="h-auto w-auto"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="mt-[28px] md:mt-[0px]">
                  <span className="w-[80px] rounded-full bg-green px-2 py-1 text-[12px] text-white">
                    Coming soon
                  </span>
                </div>
                <h3 className="mb-[28px] mt-5 text-center text-[24px] font-[600] text-white md:text-start">
                  Beat the suspicion with <br /> feedback from customers
                </h3>
                <p className="mb-[28px] text-center md:text-start">
                  Collect feedback from your customers and showcase on your
                  website or social media to help new customers confidently shop
                  from you.
                </p>
                <div className="flex w-full justify-center md:justify-start">
                  <button
                    className={`${btn} border-1 border border-brand bg-brand !py-3 !text-[18px] text-white`}
                    onClick={() => toggleWaitListModal(true)}
                  >
                    For Businesses
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
