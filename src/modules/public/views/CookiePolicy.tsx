/* eslint-disable no-template-curly-in-string */
import { Link, useNavigate } from "react-router-dom";
import caretright from "assets/img/caretright.svg";
import { addMetaData } from "core/helpers/seoHelpers";

const CookiePolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* TODO: Update meta data */}
      {addMetaData({
        title: "",
        description: "",
      })}

      <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
        <section className="mb-[28px]">
          <header className="flex flex-wrap items-center text-[14px]">
            <Link to="/">Home</Link>
            <img src={caretright} alt="" loading="lazy" />
            <p className="text-white">Cookie Policy</p>
          </header>
        </section>
        <section>
          <h1 className="mb-[18px] font-[600] text-white">
            PRISM WEBSITE COOKIE POLICY - FEBRUARY 2024
          </h1>

          {/* SECTION 1 */}
          <div className="mb-[28px]">
            <p className="my-[10px]">
              This Cookie Policy describes what cookies are, how PRISM uses them
              on their digital channels and how to disable them.{" "}
            </p>

            <div className="my-[24px]">
              <p className="mb-[10px] font-[600]">1. What are Cookies</p>
              <p>
                “Cookies” are small data files placed on your computer or other
                device which record information. For example, a cookie could
                enable our Services to recognize your browser, while another
                cookie could store your account preferences and other
                information to help make our Services more customized.
              </p>
            </div>

            <div className="my-[24px]">
              <p className="mb-[10px] font-[600]">
                2. How We Use Cookies, Web Beacons, and Similar Technologies
              </p>
              <p>
                We use Cookies, web beacons and similar technologies, such as
                tracking URLs, to identify users on https://www.useprism.co/
                (the “Site”) and collect information about how you or others
                access or engage with our Services, content, emails, and ads
                displayed on or off our Services. Cookies may also be used by
                other third-party websites where you access third-party links.
                Cookies enable us to make your user experience easier, customise
                our features and services, content and advertising; help you
                ensure that your account security is not compromised, mitigate
                risk and prevent fraud; and to promote trust and safety.
              </p>
              <p className="my-[10px]">
                Cookies allow our servers to remember your account log-in
                information when you visit the Site, IP addresses, date and time
                of visits, monitor traffic and prevent fraudulent activities
              </p>
            </div>

            <div className="my-[24px]">
              <p className="mb-[10px] font-[600]">
                3. The Types of Cookies We Use
              </p>
              <p className="my-[10px]">We use the following cookies:</p>

              <div className="my-[10px]">
                <p>
                  <span className="font-[600]">
                    Strictly necessary Cookies:{" "}
                  </span>
                  these are cookies that are required for the operation of our
                  Site. They include, for example, cookies that enable you to
                  visit the Site and make use of any of the features and
                  services.{" "}
                </p>
              </div>

              <div className="my-[10px]">
                <p>
                  <span className="font-[600]">
                    Analytical or performance Cookies:{" "}
                  </span>
                  these allow us to recognize and count the number of users or
                  visits to the Site and to see how users and visitors move
                  around the Site when it is being used. This helps us to
                  improve the way the Site works by ensuring that users can
                  easily access our services and features.
                </p>
              </div>

              <div className="my-[10px]">
                <p>
                  <span className="font-[600]">Functionality Cookies: </span>
                  these are used to recognize you when you return to the
                  Website. This enables us to personalize your experience and
                  remember your preferences and the choices you make on the
                  Site.
                </p>
              </div>

              <div className="my-[10px]">
                <p>
                  <span className="font-[600]">Targeting Cookies: </span>
                  these cookies record your visit to the Site, the pages you
                  have visited and the links you have followed.
                </p>
              </div>
            </div>

            <div className="my-[24px]">
              <p className="mb-[10px] font-[600]">
                4. Changes to this Cookie Policy
              </p>

              <p className="my-[10px]">
                As this Cookie policy is part of our privacy policy, we may
                update it at any time as described in our privacy policy. Please
                review this Cookie policy regularly to be informed of any
                updates.
              </p>
            </div>

            <div className="my-[24px]">
              <p className="mb-[10px] font-[600]">5. How to Disable Cookies</p>

              <p className="my-[10px]">
                Most browsers automatically accept Cookies, but your browser may
                have settings that enable you to decline or delete Cookies on
                your device or alert you when a site wants to place a cookie on
                your computer. Please note that if you decline Cookies, you may
                not be able to sign in, customize, or use some of the
                interactive features of our Services, as some of our Services
                require Cookies to operate.
              </p>

              <p className="mt-[28px] font-[600]">
                This Policy was updated in February 2024 and will remain on
                effect subject to any changes or amendments to its provisions.
              </p>
            </div>
          </div>
          {/* END SECTION 1 */}
        </section>
      </div>
    </>
  );
};

export default CookiePolicy;
