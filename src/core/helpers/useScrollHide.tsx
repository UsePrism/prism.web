import { useRef, useEffect } from "react";

interface Props {
  hiddenRef?: any;
  targetDivId?: any;
  offset?: number;
}

const useScrollHide = ({ hiddenRef, targetDivId, offset = 0 }: Props) => {
  const elementToHide: any = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const targetDiv = document.getElementById(targetDivId);

      if (targetDiv) {
        const targetDivTop = targetDiv.offsetTop;
        const targetDivHeight = targetDiv.offsetHeight;

        if (scrollPosition >= targetDivTop + targetDivHeight + offset) {
          elementToHide.current.style.display = "";
        } else {
          elementToHide.current.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hiddenRef, targetDivId, offset]);

  return elementToHide;
};

export default useScrollHide;
