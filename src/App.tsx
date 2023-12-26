import Loader from "core/components/Loader";
import Modal from "core/components/Modal";
import InputField from "core/components/formfields/InputField";
import { ScrollToTop } from "core/helpers/scrollToTop";
import useSystemStore from "core/services/stores/useSystemStore";
import useUserStore from "core/services/stores/useUserStore";
import Admin from "modules/admin/Admin";
import Auth from "modules/auth/Auth";
import Public from "modules/public/Public";
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

  return (
    <>
      {isUserStoreLoading && <Loader />}
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
          <form>
            <div className="mb-[16px] flex gap-[16px]">
              <div className="w-1/2">
                <InputField
                  label="First Name"
                  name="firstname"
                  id="firstName"
                  type="text"
                  value=""
                  onChange={() => {}}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label="Last Name"
                  name="lastname"
                  id="lastName"
                  type="text"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>

            <InputField
              boxStyle="mb-[16px]"
              label="Business Name"
              name="businessname"
              id="businessname"
              type="text"
              placeholder="Business name"
              value=""
              onChange={() => {}}
            />

            <InputField
              boxStyle="mb-[16px]"
              label="Email Address"
              name="email"
              id="email"
              type="email"
              placeholder="Email Address"
              value=""
              onChange={() => {}}
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
