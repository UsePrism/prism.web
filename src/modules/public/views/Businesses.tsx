/* eslint-disable no-template-curly-in-string */
import Pagination from "core/components/Pagination";
import { businesslogo, caretright } from "core/consts/images";
import { borderline } from "core/consts/styling";
import { renderStars } from "core/helpers/renderStars";
import useBusinessStore from "core/services/stores/useBusinessStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";

const Businesses = () => {
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

  useEffect(() => {
    if (categories?.length < 1) {
      getCategoriesAction();
    }
  }, []);

  useEffect(() => {
    var categoryId = searchParams.get("categoryId");

    setQuery((state) => ({
      ...state,
      categoryId: categoryId != null ? categoryId : 0,
    }));

    getBusinessesAction({
      ...query,
      categoryId: categoryId != null ? categoryId : 0,
    });
  }, [searchParams.get("categoryId")]);

  return (
    <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
      <section className="mb-[28px]">
        <header className="flex flex-wrap items-center text-[14px]">
          <Link to="/">Home</Link>
          <img src={caretright} alt="" loading="lazy" />
          <Link
            to="/businesses"
            className={`font-[500] ${
              searchParams.get("categoryId")?.length > 1 ? "" : "text-white"
            }`}
          >
            Businesses
          </Link>
          {searchParams.get("categoryId") != null &&
            searchParams.get("categoryId") > 0 && (
              <>
                <img src={caretright} alt="" loading="lazy" />
                <span className="text-white">
                  {
                    categories?.find(
                      (x) => x.id == searchParams.get("categoryId"),
                    )?.name
                  }
                </span>
              </>
            )}
        </header>
      </section>
      <section className="mb-[28px] flex flex-col gap-5 lg:flex-row">
        <div className="w-full lg:w-1/4">
          <div className={`${borderline} w-full`}>
            <h5 className="mb-[28px] font-[600] text-white">Categories</h5>
            <div className="grid w-full grid-flow-col grid-rows-2 gap-5 overflow-x-auto lg:block">
              {categories?.length > 0 &&
                categories?.map((category: Category, index: number) => (
                  <a
                    key={index}
                    href={`businesses?categoryId=${category?.id}`}
                    className="flex !w-[250px] flex-none snap-center snap-always items-center gap-3 rounded-[5px] p-3 hover:bg-shade hover:text-white lg:mb-5 lg:w-auto"
                  >
                    <img
                      src={category?.iconUrl}
                      className="h-[28px] w-[28px]"
                      alt=""
                      loading="lazy"
                    />
                    <p className="text-wrap text-[14px] font-[500]">
                      {category?.name}
                    </p>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className={`${borderline} w-full`}>
            <h5 className="mb-[28px] font-[600] text-white">
              {searchParams.get("categoryId") != null
                ? categories?.find(
                    (x) => x.id == searchParams.get("categoryId"),
                  )?.name
                : "All"}{" "}
              ({businessList?.businesses?.length})
            </h5>
            {businessList?.businesses && businessList?.businesses.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {businessList?.businesses.map((business: Business) => (
                  <div
                    key={business?.id}
                    className={`cursor-pointer overflow-hidden rounded-[5px] p-[0px]`}
                    onClick={() => {
                      navigate(
                        `/businesses/${encodeURIComponent(business?.id)}`,
                      );
                    }}
                  >
                    <div className="h-[140px] border border-[.5px] border-shade bg-shade"></div>
                    <div className="w-full rounded-b-[5px] border-x border-x-[.5px] border-b border-b-[.5px] border-x-[#344054] border-b-[#344054] px-5 pb-8 text-center">
                      <img
                        src={businesslogo}
                        alt=""
                        className="mt-[-20%] inline-block rounded-full"
                      />
                      <p className="mb-1 mt-5 text-white">
                        {business?.businessName}
                      </p>
                      <p className="mb-5 text-line">
                        {
                          categories?.find(
                            (cat) => cat?.id === business?.businessCategoryId,
                          )?.name
                        }
                      </p>
                      <div className="mb-1 flex w-full items-center justify-center gap-2">
                        <div className="flex items-center">
                          {renderStars(business?.averageRating)}
                        </div>
                        <span>{business?.averageRating}</span>
                      </div>
                      <p className="text-[14px] text-black-support">
                        {business?.totalReviews}{" "}
                        {business?.totalReviews > 1 ? "Reviews" : "Review"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No business has been reviewed yet for this category</div>
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

export default Businesses;
