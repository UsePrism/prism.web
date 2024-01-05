/* eslint-disable no-template-curly-in-string */
import {
  businesslogo,
  caretright,
  locationimg,
  starFull,
  world,
} from "core/consts/images";
import { borderline, btn } from "core/consts/styling";
import { renderStars } from "core/helpers/renderStars";
import { useParams, Link } from "react-router-dom";
import { Review } from "../partials/Review";
import { reviews } from "core/consts/mocks";
import useSystemStore from "core/services/stores/useSystemStore";

const Business = () => {
  const { businessId } = useParams();
  const category = "Food and Dining";

  const toggleWaitListModal = useSystemStore(
    (store) => store.toggleWaitListModal,
  );

  return (
    <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
      <section className="mb-[28px]">
        <header className="flex items-center">
          <span>Home</span>
          <img src={caretright} alt="" loading="lazy" />
          <Link to="/businesses">Businesses</Link>
          <img src={caretright} alt="" loading="lazy" />
          <Link to={`/businesses?name=${encodeURIComponent(category)}`}>
            Food & Dining
          </Link>
          <img src={caretright} alt="" loading="lazy" />
          <span className="text-white">Burger King</span>
        </header>
      </section>
      <section className="mb-[28px] flex flex-col gap-5 lg:flex-row">
        <div className={`w-full lg:w-3/4`}>
          <div className={`${borderline} !px-0 !py-0`}>
            <div className="h-[160px] border-b-[.5px] border-b-[#344054] bg-shade"></div>
            <div className="px-5 pb-8 pt-5">
              <img
                src={businesslogo}
                alt=""
                className="mt-[-75px] inline-block rounded-full"
              />
              <p className="mb-1 mt-5 text-white">Burger King</p>
              <p className="mb-1 text-[14px] text-line">Food and Dining</p>
              <div className="my-[12px] flex items-center gap-[5px]">
                <img src={locationimg} alt="" />
                <p className="mr-[20px] text-[14px]">Ikeja, Lagos.</p>
                <p className="text-[14px]">
                  Rating <span>5.0</span>
                </p>
                <img src={starFull} alt="" className="h-[14px] w-[14px]" />
              </div>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                rerum blanditiis temporibus, maxime accusamus quaerat error
                facere nam ab rem?
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <div className={`${borderline} bg-shade !pb-8`}>
            <h5 className="mb-[6px] hidden text-[24px] font-[500] text-white lg:block">
              Burger King
            </h5>
            <button
              onClick={() => toggleWaitListModal(true)}
              className="text-[14px] text-brand"
            >
              Own this business? Claim
            </button>
            <div className="my-[24px] flex w-full items-center justify-start gap-2">
              <div className="flex rounded-[5px] bg-[#344054] p-[8px]">
                {renderStars(4.2, "w-[18px] h-[18px]")}
              </div>
              <p className="text-[14px]">
                <span className="font-bold">4.5</span>
                <span>(35 Reviews)</span>
              </p>
            </div>
            <div className="mb-[12px] flex items-center gap-[5px]">
              <img src={locationimg} alt="" />
              <p className="text-[14px]">76b Queens Street Ikeja, Lagos.</p>
            </div>
            <div className="mb-[16px] flex items-center gap-[5px]">
              <img src={world} alt="" />
              <a
                href={`www.google.com`}
                className="text-[14px] text-brand underline"
              >
                BurgerKing.com
              </a>
            </div>
            <div className="flex w-full items-center">
              <Link
                to="/review"
                className={`${btn} bg-brand py-[8px] text-white`}
              >
                Write a Review
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full lg:w-3/4">
        <p className="text-[24px] font-[600] text-white">23 Reviews</p>
        <div>
          {reviews?.length > 0 &&
            reviews?.map((review: any, index: number) => (
              <Review review={review} key={index} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Business;
