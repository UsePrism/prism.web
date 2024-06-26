import React from "react";
import closeImg from "assets/img/close.svg";

export default function Modal({
  onClose = () => {},
  children = "Modal",
  header = "",
  instruction = "",
  boxStyle = "",
  bodyStyle = "",
}: {
  onClose?: any;
  children?: any;
  boxStyle?: string;
  bodyStyle?: string;
  header?: string;
  instruction?: string;
}) {
  return (
    <>
      <div
        className={`no-scrollbar overlay fixed left-0 top-0 z-40 h-screen w-screen overflow-auto bg-black bg-opacity-5 backdrop-blur-lg backdrop-filter ${boxStyle}`}
        style={{
          minHeight: "calc(100vh - 72px)",
          zIndex: 800,
        }}
      >
        <div className="flex h-full w-full items-center justify-center gap-1">
          <div
            className={`mx-auto h-auto w-11/12 overflow-y-scroll rounded-[5px] bg-[#111111] !p-8 sm:w-2/3 md:w-[65%] lg:w-1/3 ${bodyStyle}`}
          >
            <div className="border-b-1 flex items-start justify-between border-b border-b-black-support pb-5">
              <div>
                <p className="mb-2 text-[18px] font-[600] text-white">
                  {header}
                </p>
                <p className="text-[14px]">{instruction}</p>
              </div>
              <button type="button" className="" onClick={onClose}>
                <img src={closeImg} alt="" />
              </button>
            </div>

            <div className="mb-2">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
