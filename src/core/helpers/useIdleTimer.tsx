import { useEffect, useRef } from "react";
import notification from "./notification";

interface Props {
  timeout?: any;
  onInactive?: any;
}

const useIdleTimer = ({ timeout = () => {}, onInactive = () => {} }: Props) => {
  const lastActiveTime = useRef(Date.now());

  useEffect(() => {
    const handleUserInteraction = () => {
      lastActiveTime.current = Date.now();
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("mousemove", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("mousemove", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [timeout]);

  useEffect(() => {
    const handleInactivity = () => {
      onInactive();

      notification({
        message: "You have been logged out due to inactivity",
        type: "warning",
      });
    };

    const intervalId = setInterval(handleInactivity, timeout);

    return () => clearInterval(intervalId);
  }, [timeout, onInactive]);
};

export default useIdleTimer;
