/* eslint-disable no-template-curly-in-string */
import { businesslogo, caretright } from "core/consts/images";
import { reviewedBusinesses } from "core/consts/mocks";
import { borderline } from "core/consts/styling";
import { getCatgories, renderStars } from "core/helpers/renderStars";
import { useSearchParams } from "react-router-dom";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const categories = getCatgories();

  return (
    <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
      <section className="mb-[28px]">
        <header className="flex items-center">
          <span>Home</span>
          <img src={caretright} alt="" loading="lazy" />
          <span className="font-[500] text-white">Categories</span>
        </header>
      </section>
      <section className="mb-[28px] flex flex-col gap-5 lg:flex-row">
        <div className={`${borderline} w-full lg:w-1/4`}>
          <h5 className="mb-[28px] font-[600] text-white">Categories</h5>
          <div className="flex snap-mandatory flex-nowrap gap-5 overflow-x-auto lg:block">
            {categories.slice(0, 3).map((category: any, index: number) => (
              <div
                key={index}
                className="mb-5 flex w-auto flex-none snap-center snap-always items-center gap-3 rounded-[5px] p-3 hover:bg-shade hover:text-white"
              >
                <img src={category?.icon} alt="" loading="lazy" />
                <p className="text-wrap text-[14px] font-[500]">
                  {category?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${borderline} w-full lg:w-3/4`}>
          <h5 className="mb-[28px] font-[500] text-white">Automotive</h5>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {reviewedBusinesses.length > 0 &&
              reviewedBusinesses.map((business: any, index: number) => (
                <div className={`overflow-hidden rounded-[5px] p-[0px]`}>
                  <div className="h-[120px] border border-[.5px] border-shade bg-shade"></div>
                  <div className="w-full rounded-b-[5px] border-x border-x-[.5px] border-b border-b-[.5px] border-x-[#344054] border-b-[#344054] px-5 pb-5 text-center">
                    <img
                      src={businesslogo}
                      alt=""
                      className="mt-[-20%] inline-block"
                    />
                    <p className="mb-1 mt-5 text-white">
                      {business?.business_name}
                    </p>
                    <p className="mb-5 text-line">{business?.category}</p>
                    <div className="mb-1 flex w-full items-center justify-center gap-2">
                      <div className="flex">
                        {renderStars(business?.rating)}
                      </div>
                      <span>{business?.rating}</span>
                    </div>
                    <p className="text-[14px] text-black-support">
                      {business?.number_of_reviews} Reviews
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
