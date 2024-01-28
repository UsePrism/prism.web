import Loader from "core/components/Loader";
import Modal from "core/components/Modal";
import InputField from "core/components/formfields/InputField";
import notification from "core/helpers/notification";
import { ScrollToTop } from "core/helpers/scrollToTop";
import useBusinessStore from "core/services/stores/useBusinessStore";
import useSystemStore from "core/services/stores/useSystemStore";
import useUserStore from "core/services/stores/useUserStore";
import Admin from "modules/admin/Admin";
import Auth from "modules/auth/Auth";
import Public from "modules/public/Public";
import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  const showWaitListModal = useSystemStore((store) => store.showWaitListModal);
  const toggleWaitListModal = useSystemStore(
    (store) => store.toggleWaitListModal,
  );
  const isUserStoreLoading = useUserStore((store) => store.isLoading);
  const isBusinessStoreLoading = useBusinessStore((store) => store.isLoading);

  const joinWaitlistAction = useUserStore((store) => store.joinWaitList);
  const [errors, setErrors] = useState<any>([]);
  const [Waitlist, setWaitList] = useState<Waitlist>({
    businessEmail: "",
    businessName: "",
    firstName: "",
    lastName: "",
  });

  const onWaitListChange = (event: any) => {
    const { name, value } = event?.target;
    setWaitList((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const validateWaitlist = (info: Waitlist) => {
    var isValid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info?.businessEmail)) {
      setErrors((state: any) => ({
        ...state,
        BusinessEmail: [{ errorMessage: "A valid Email address is required" }],
      }));
      isValid = false;
    }

    if (info?.businessName?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        BusinessName: [
          {
            errorMessage: "Business Name is required",
          },
        ],
      }));
      isValid = false;
    }

    if (info?.firstName?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        FirstName: [
          {
            errorMessage: "First Name is required",
          },
        ],
      }));
      isValid = false;
    }

    if (info?.lastName?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        LastName: [
          {
            errorMessage: "Last Name is required",
          },
        ],
      }));
      isValid = false;
    }

    return isValid;
  };

  const joinWaitList = async (e: any) => {
    e.preventDefault();

    if (validateWaitlist(Waitlist)) {
      var res = await joinWaitlistAction(Waitlist);

      if (res?.status) {
        setWaitList({
          businessEmail: "",
          businessName: "",
          firstName: "",
          lastName: "",
        });
        toggleWaitListModal(false);
      } else {
        setErrors({ ...res?.errors });
      }
    } else {
      notification({
        title: "",
        message: "Please pass all required information",
        type: "danger",
      });
    }
  };

  return (
    <>
      {(isUserStoreLoading || isBusinessStoreLoading) && <Loader />}
      <Router>
        <ScrollToTop />
        <ReactNotifications />
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<Public />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>

      {showWaitListModal && (
        <Modal
          header="Join Waitlist"
          instruction="kindly enter your correct details"
          onClose={() => toggleWaitListModal(false)}
        >
          <form onSubmit={joinWaitList} className="mt-[25px]">
            <div className="mb-[16px] flex gap-[16px]">
              <div className="w-1/2">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={Waitlist?.firstName}
                  onChange={onWaitListChange}
                  errors={errors?.FirstName}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      FirstName: "",
                    }))
                  }
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={Waitlist?.lastName}
                  onChange={onWaitListChange}
                  errors={errors?.LastName}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      LastName: "",
                    }))
                  }
                />
              </div>
            </div>

            <InputField
              boxStyle="mb-[16px]"
              label="Business Name"
              name="businessName"
              placeholder="Business name"
              value={Waitlist?.businessName}
              onChange={onWaitListChange}
              errors={errors?.BusinessName}
              onBlur={() =>
                setErrors((state: any) => ({
                  ...state,
                  BusinessName: "",
                }))
              }
            />

            <InputField
              boxStyle="mb-[16px]"
              label="Email Address"
              name="businessEmail"
              type="email"
              placeholder="Email Address"
              value={Waitlist?.businessEmail}
              onChange={onWaitListChange}
              errors={errors?.BusinessEmail}
              onBlur={() =>
                setErrors((state: any) => ({
                  ...state,
                  BusinessEmail: "",
                }))
              }
            />

            <button className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
              Submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default App;
