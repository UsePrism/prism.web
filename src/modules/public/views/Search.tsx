/* eslint-disable no-template-curly-in-string */
import Pagination from "core/components/Pagination";
import RatingsField from "core/components/formfields/RatingsField";
import { borderline } from "core/consts/styling";
import notification from "core/helpers/notification";
import { renderStars } from "core/helpers/renderStars";
import useBusinessStore from "core/services/stores/useBusinessStore";
import useUserStore from "core/services/stores/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import businesslogo from "assets/img/businesslogo.svg";
import locationimg from "assets/img/location.svg";
import world from "assets/img/world.svg";
import starFull from "assets/img/starfull.svg";
import SelectField from "core/components/formfields/SelectField";

const Search = () => {
  const user: any = useUserStore((store) => store.user);

  const categories = useBusinessStore((store) => store.categories);
  const getCategoriesAction = useBusinessStore((store) => store.getCategories);

  const businessList = useBusinessStore((store) => store.businessList);
  const getBusinessesAction = useBusinessStore((store) => store.getBusinesses);

  const [searchParams, setSearchParams]: any = useSearchParams();

  const [query, setQuery] = useState<SearchQuery>({
    categoryId: 0,
    pageNumber: 1,
    pageSize: 12,
    searchTerm: "",
    sortOrder: "",
  });

  const navigate = useNavigate();

  const fetchMore = async (page: number) => {
    setQuery((state) => ({ ...state, pageNumber: page }));

    await getBusinessesAction({ ...query, pageNumber: page });
  };

  const uniqueBusinessCategories = [
    ...new Set(
      businessList?.businesses.map((business) => business.businessCategoryId),
    ),
  ];

  useEffect(() => {
    if (categories?.length < 1) {
      getCategoriesAction();
    }
  }, []);

  useEffect(() => {
    var term = searchParams.get("term");

    setQuery((state) => ({
      ...state,
      searchTerm: term,
    }));

    getBusinessesAction({
      ...query,
      searchTerm: term,
    });
  }, [searchParams.get("term")]);

  return (
    <div className="">
      <section className="bg-shade">
        <div className="m-[0px] mx-auto mb-[28px] h-full w-11/12 overflow-hidden !py-[40px] md:w-4/5">
          <div className={`w-full`}>
            <h5 className="mb-[28px] text-center text-[24px] font-[600] text-white">
              You searched for "{`${query?.searchTerm}`}"
            </h5>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {categories?.length > 0 &&
                categories
                  ?.filter((category) =>
                    uniqueBusinessCategories.includes(category?.id),
                  )
                  ?.map((category: Category, index: number) => (
                    <div
                      key={index}
                      onClick={() =>
                        navigate(`/businesses?categoryId=${category?.id}`)
                      }
                      className={`${borderline} flex items-center gap-2 rounded-[5px] !bg-black !p-3 hover:cursor-pointer hover:bg-shade hover:text-white md:block md:!p-4`}
                    >
                      <img
                        src={category?.iconUrl}
                        className="mb-2 h-[28px] w-[28px]"
                        alt=""
                        loading="lazy"
                      />
                      <p className="text-wrap text-[12px] font-[500]">
                        {category?.name}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>
      <section className="m-[0px] mx-auto mb-[28px] mb-[34px] flex h-full w-11/12 flex-col gap-5 overflow-hidden pt-[20px] md:w-4/5 lg:flex-row">
        <div className="hidden w-full md:block lg:w-1/5">
          <div className={`${borderline} w-full`}>
            <h5 className="mb-[28px] font-[600] text-white">Rating</h5>

            <div>
              <RatingsField rating={5} />
              <RatingsField rating={4} />
              <RatingsField rating={3} />
              <RatingsField rating={2} />
              <RatingsField rating={1} />
              <RatingsField rating={0} />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/5">
          <div className={`${borderline} w-full !p-6`}>
            <div className="flex mb-[28px] items-center justify-between">
              <h5 className="font-[600] text-white">
                Businesses ({businessList?.businesses?.length})
              </h5>

              <SelectField
                boxStyle="block md:hidden !w-2/5"
                selectStyle="h-10 !text-[12px] !py-1 !px-1"
                label=""
                name="businessCategoryId"
                defaultName="Select Category"
                defaultValue=""
                options={[
                  ...categories?.map((category) => {
                    return {
                      name: category?.name,
                      value: category?.id,
                    };
                  }),
                ]}
                onChange={(e: any) => {
                  if (e?.target?.value?.length > 0) {
                    navigate(`/businesses?categoryId=${e?.target?.value}`);
                  }
                }}
              />
            </div>

            {businessList?.businesses && businessList?.businesses.length > 0 ? (
              <div>
                {businessList?.businesses.map((business: Business) => (
                  <div
                    key={business?.id}
                    className={`${borderline} mb-6 cursor-pointer overflow-hidden rounded-[5px] !bg-shade p-[0px]`}
                    onClick={() => {
                      navigate(
                        `/businesses/${encodeURIComponent(business?.id)}`,
                      );
                    }}
                  >
                    <div className="jusitify-center flex flex-col items-center gap-[15px] px-[10px] py-[20px] md:flex-row md:justify-start md:gap-[40px] md:px-[20px] md:py-[30px]">
                      <img
                        src={businesslogo}
                        alt=""
                        className="inline-block h-[60px] w-[60px] rounded-full"
                      />
                      <div className="text-center md:text-start">
                        <p className="mb-1 font-[500]">
                          {business?.businessName}
                        </p>
                        <div className="flex items-center justify-center gap-5 md:justify-start lg:gap-10">
                          <div className="hidden items-center md:flex">
                            {renderStars(business?.averageRating)}
                          </div>
                          <span className="flex items-center gap-[.5px] text-white">
                            <span className="hidden md:inline">
                              Prism Rating{" "}
                            </span>
                            <img
                              src={starFull}
                              className="ml-1 inline"
                              alt=""
                            />
                            <span>{business?.averageRating}</span>
                          </span>
                          <span>|</span>
                          <p className="text-white">
                            {business?.totalReviews}{" "}
                            {business?.totalReviews > 1 ? "Reviews" : "Review"}
                          </p>
                        </div>
                        <div className="mt-1 flex  flex-col items-center justify-center gap-1 md:flex-row md:justify-start md:gap-5">
                          {business?.businessPhoneNumber && (
                            <p className="text-[14px]">
                              {business?.businessPhoneNumber}
                            </p>
                          )}
                          {business?.businessAddress && (
                            <p className="text-[14px]">
                              {business?.businessAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-t-[.5px] border-[#344054] p-[15px] md:p-[20px]">
                      <div className="flex items-center gap-2 md:gap-5">
                        <img src={world} alt="" />
                        <img src={locationimg} alt="" />
                        <span>|</span>
                        <p className="text-[14px]">
                          {
                            categories?.find(
                              (cat) => cat?.id === business?.businessCategoryId,
                            )?.name
                          }
                        </p>
                      </div>

                      <button
                        className="text-[14px] text-brand"
                        onClick={(e: any) => {
                          e.stopPropagation();

                          if (user.id?.length < 1) {
                            return notification({
                              type: "warning",
                              message:
                                "Please login before you can add a review",
                            });
                          } else {
                            navigate(`/review?businessId=${business?.id}`);
                          }
                        }}
                      >
                        Write a Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No result for the term you searched for</div>
            )}

            {businessList?.businesses?.length > 0 && (
              <Pagination
                pagination={businessList?.pagination}
                onFetch={fetchMore}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Search;
