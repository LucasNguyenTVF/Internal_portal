import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Modal from "react-modal";
import closeIcon from "../../assets/close.svg";
import userIcon from "../../assets/user_avatar_default.svg";
import { EmployeeNode } from "../interfaces/employee";
import "./InfoDetailModal.modules.css"



export interface ModalRef {
  showModal: (data: EmployeeNode) => void;
  hideModal: () => void;
}
const getModalWidth = () => (window.innerWidth > 1536 ? "45%" : window.innerWidth > 1280 ? "50%" : window.innerWidth > 1024? "60%" : "85%");

const InfoDetailModal = forwardRef<ModalRef, any>((_, ref) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [detailInfo, setDetailInfoData] = useState<EmployeeNode>();
  const [modalWidth, setModalWidth] = useState(getModalWidth());
  const updateModalWidth = () => {
    setModalWidth(getModalWidth());
  };

  useEffect(() => {
    window.addEventListener("resize", updateModalWidth);
    return () => window.removeEventListener("resize", updateModalWidth);
  }, []);

  useEffect(() => {
    if (isShowModal) {
      document.body.style.overflow = "hidden"; // Tắt scroll khi mở modal
    } else {
      document.body.style.overflow = ""; // Bật lại scroll khi đóng modal
    }

    return () => {
      document.body.style.overflow = ""; // Đảm bảo bật lại scroll khi unmount
    };
  }, [isShowModal]);

  const customStyles = useMemo(()=>({
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90vw",
      width: modalWidth,
      padding: "20px",
      borderRadius: 20,
      backgroundColor: "#06234F",
      border: "none",
      maxHeight: "70vh",
      overflowY: "auto",
      scrollbarWidth: "none",
    },
    overlay: {
      backgroundColor: "#ffffff26",
      zIndex: 1000, // Ensures modal is above everything
    },
  }),[modalWidth]);

  const showModal = (data) => {
    setDetailInfoData(data);
    setIsShowModal(true);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      showModal,
      hideModal,
    }),
    []
  );

  return (
     <Modal isOpen={isShowModal} onRequestClose={hideModal} style={customStyles}>
      <div className="flex justify-end">
        <button onClick={hideModal}>
          <img src={closeIcon} alt="close" className="w-5 md:w-8 h-5 md:h-8" />
        </button>
      </div>

      <div className="px-6">
        <h2 className="!text-lg md:!text-2xl text-[#004c8f] mt-2 mb-6">INFORMATION</h2>
        {/* Avatar + Info (Responsive) */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-16 items-center mb-6">
          <div className="w-28 sm:w-36 lg:w-42 h-28 sm:h-36 lg:h-42">
            <img
              src={detailInfo?.data?.image ?? userIcon}
              className="w-full h-full object-cover rounded-full border-dashed border-4 border-[#004c8f]"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg sm:text-2xl font-semibold mb-1 lg:mb-3">{detailInfo?.data?.account}</p>
            <span className="text-sm sm:text-lg font-medium text-[#b1b1b1]">{detailInfo?.data?.position}</span>
          </div>
        </div>

        {/* Information Grid (Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm md:text-lg mb-2 font-semibold">Email:</p>
            <span className="text-xs md:text-sm text-[#d8d8d8]">{detailInfo?.data?.email ?? "abc@gmail.com"}</span>
          </div>
          <div>
            <p className="text-sm md:text-lg mb-2 font-semibold">Name:</p>
            <span className="text-xs md:text-sm text-[#d8d8d8]">{detailInfo?.data?.fullName}</span>
          </div>
          <div>
            <p className="text-sm md:text-lg mb-2 font-semibold">Location:</p>
            <span className="text-xs md:text-sm text-[#d8d8d8]">{detailInfo?.data?.location ?? "Da Nang, Viet Nam"}</span>
          </div>
          <div>
            <p className="text-sm md:text-lg mb-2 font-semibold">Working Hour:</p>
            <span className="text-xs md:text-sm text-[#d8d8d8]">{detailInfo?.data?.workingHour ?? "08:30 - 17:30"}</span>
          </div>
          <div>
            <p className="text-sm md:text-lg mb-2 font-semibold">Departure:</p>
            <span className="text-xs md:text-sm text-[#d8d8d8]">{detailInfo?.data?.departure ?? "D3"}</span>
          </div>
          <div>
            <p className="text-sm md:text-lg mb-2 font-semibold">Job Title:</p>
            <span className="text-xs md:text-sm text-[#d8d8d8]">{detailInfo?.data?.position ?? ""}</span>
          </div>
          <div>
            <p className="text-sm md:text-lg mb-2 font-semibold">Report to:</p>
            <span className="text-xs md:text-sm text-[#d8d8d8]"></span>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default memo(InfoDetailModal);