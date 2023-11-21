import { lightAccent } from "core/consts/images";

const Home = () => {
  return (
    <div className="m-[0px] bg-black">
      <section className="h-[80vh] bg-black">
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
    </div>
  );
};

export default Home;
