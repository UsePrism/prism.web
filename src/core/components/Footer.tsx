import { logoFullWhite } from "core/consts/images";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    {
      name: "Home",
      url: "/home",
    },
    {
      name: "Career",
      url: "/career",
    },
    {
      name: "Blog",
      url: "/blog",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "About Us",
      url: "/about",
    },
    {
      name: "How It Works",
      url: "/faqs",
    },
    {
      name: "Terms",
      url: "/terms",
    },
    {
      name: "Privacy",
      url: "/policy",
    },
    {
      name: "Cookies",
      url: "/cookies",
    },
  ];

  return (
    <>
      <footer className="bg-black-main text-[#F7F9FB]">
        <div className="mx-auto flex w-11/12 items-center justify-between pb-[45px] pt-[75px] md:w-4/5">
          <div className="flex flex-col justify-between gap-[60px] md:flex-row md:gap-[40px] lg:gap-[60px]">
            <div className="w-full md:w-1/4">
              <img
                src={logoFullWhite}
                alt="prism"
                className="mb-[32px] w-[100px]"
              />
              <p className="text-[14px] text-line">
                Prims allow users to submit detailed reports, including the name
                of the business, its contact information, a description of the
                fraudulent activity, and any supporting documentation. Prism
                will also provide users with resources and support, such as
                contact information for law enforcement agencies and consumer
                protection groups.
              </p>
            </div>
            <div className="w-full md:w-2/4">
              <h3 className="mb-[32px] text-[18px]">Explore</h3>
              <div className="grid grid-flow-col grid-rows-4 gap-4">
                {footerLinks?.map((link: any, index: number) => (
                  <Link
                    className="text-[14px] text-line"
                    key={index}
                    to={link?.url}
                  >
                    {link?.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/4">
              <h3 className="mb-[32px] text-[18px]">Contact</h3>
              <div className="flex flex-col gap-4 text-line">
                <a href="mailto:suppport@useprism.co" className="block">
                  support@useprism.co
                </a>
                <a href="tel:+2340000000000" className="block">
                  +234 000 0000 111
                </a>
                <p>Call lines are open 08:00 to 17:00 WAT, Mondays - Fridays</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-11/12 items-center justify-between bg-[#001219] py-[40px] text-black-support md:w-4/5">
          <p>&copy; {new Date().getFullYear()} Prism. All rights reserved.</p>
          <div>
            <a href="http://twitter.com"></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
