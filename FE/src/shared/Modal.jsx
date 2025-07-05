import { MdClose } from "react-icons/md";

export function Modal({ isOpen, title = "MODAL", onClose, children }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-30 ">
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg max-w-xs lg:max-w-lg lg:w-full p-6`}
        >
          <div className="header flex">
            <h1 className="lg:text-xl text-md  dark:text-gray-50 font-bold">
              {title}
            </h1>
            <button
              onClick={onClose}
              className="ms-auto text-2xl dark:text-gray-50 text-gray-500 hover:text-red-800 hover:dark:text-red-500"
            >
              <MdClose />
            </button>
          </div>
          <div className="mainModal mt-10">{children}</div>
        </div>
      </div>
    </>
  );
}
