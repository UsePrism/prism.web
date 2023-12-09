/* eslint-disable no-template-curly-in-string */
import { getCatgories, renderStars } from "core/helpers/renderStars";
import { useSearchParams } from "react-router-dom";

const Categories = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("name"));

  const categories = getCatgories();

  return (
    <div className="m-[0px]">
      <section className="mx-auto flex h-full w-11/12 items-center overflow-hidden md:w-4/5">
        <h1>Categories</h1>
      </section>
    </div>
  );
};

export default Categories;
