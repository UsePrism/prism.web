import { Link } from "react-router-dom";
import instagram from 'assets/img/instagram.svg';
import twitter from 'assets/img/twitterx.svg';
import facebook from 'assets/img/facebook.svg';
import linkedin from 'assets/img/linkedin.svg';
import logoFullWhite from "assets/img/logofull.svg";

const Footer = () => {
  const footerLinks = [
    {
      name: "Terms",
      url: "/terms",
    },
    {
      name: "Privacy",
      url: "/privacy",
    },
    {
      name: "Cookies",
      url: "/cookies",
    },
  ];

  return (
    <>
      <footer className="bg-[#111111] text-line">
        <div className="mx-auto w-11/12 items-center pt-[75px] md:w-4/5">
          <div className="mb-[34px] flex flex-col justify-center gap-[60px] md:flex-row md:gap-[40px] lg:gap-[60px]">
            <div className="w-full text-center md:w-2/4">
              <img
                src={logoFullWhite}
                alt="prism"
                loading="lazy"
                className="mx-auto mb-[32px] w-[100px]"
              />
              <p className="text-[14px] text-line">
                Prism allow users to submit detailed reports, including the name
                of the business, its contact information, a description of the
                fraudulent activity, and any supporting documentation. Prism
                will also provide users with resources and support, such as
                contact information for law enforcement agencies and consumer
                protection groups.
              </p>
            </div>
          </div>
          <div className="mb-[34px] flex items-center justify-center gap-5">
            <a href="http://twitter.com">
              <img
                src={twitter}
                className="h-[25x] w-[25px]"
                loading="lazy"
                alt="twitter"
              />
            </a>
            <a href="http://linkedin.com">
              <img
                src={linkedin}
                className="h-[25x] w-[25px]"
                loading="lazy"
                alt="linkedin"
              />
            </a>
            <a href="http://facebook.com">
              <img
                src={facebook}
                className="h-[25x] w-[25px]"
                loading="lazy"
                alt="facebook"
              />
            </a>
            <a href="http://instagram.com">
              <img
                src={instagram}
                className="h-[25x] w-[25px]"
                loading="lazy"
                alt="instagram"
              />
            </a>
          </div>
          <div className="text-center mb-[48px]">
            <a href="mailto:support@useprism.co">support@useprism.co</a>
          </div>
          <div className="border-t border-t-[#344054]">
            <div className="mx-auto flex flex-col items-center justify-between gap-3 py-[20px] text-[14px] text-[#7B869F] md:flex-row">
              <p>
                &copy; {new Date().getFullYear()} Prism. All rights reserved.
              </p>
              <div className="flex gap-3">
                {footerLinks?.map((link: any, index: number) => (
                  <Link
                    className="text-[14px] hover:text-brand-white"
                    key={index}
                    to={link?.url}
                  >
                    {link?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
