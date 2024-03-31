import { createRef, useRef, useState } from "react";
import videoImg from "assets/img/video.png";

export default function VideoPlayer({ src }: { src?: string }) {
  //const videoRef = useRef<HTMLVideoElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef: any = createRef();

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document?.exitFullscreen) {
        document?.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        /* Firefox */
        (document as any).mozCancelFullScreen();
      } else if ((document as any)?.webkitExitFullscreen) {
        /* Chrome, Safari & Opera */
        (document as any)?.webkitExitFullscreen();
      } else if ((document as any)?.msExitFullscreen) {
        /* IE/Edge */
        (document as any)?.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="relative flex h-[80px] w-[80px] cursor-pointer flex-row items-center justify-center rounded-[10px] border border-[.5px] border-[#344054] bg-shade">
      <video
        className="h-[40px] w-[40px]"
        ref={videoRef}
        src={src}
        controls
        width="640"
        height="360"
      ></video>
      <button
        onClick={toggleFullScreen}
        className="absolute flex h-[90%] w-[90%] items-center justify-center bg-shade"
      >
        <img src={videoImg} alt="" className="h-[40px] w-[40px]" />
      </button>
    </div>
  );
}
