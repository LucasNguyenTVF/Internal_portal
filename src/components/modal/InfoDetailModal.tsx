import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export interface ModalRef {
  showModal: (data: any) => void;
  hideModal: () => void;
}

interface ModalProps {}
const InfoDetailModal = forwardRef<ModalRef, ModalProps>(({}, ref) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [detailInfo, setDetailInfoData] = useState(null);
  console.log("🤡 Nhi ~ detailInfo:", detailInfo);

  const showModal = (data: any) => {
    setDetailInfoData(data);
    setIsShowModal(true);
  };

  const afterOpenModal = () => {};

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
    <Modal
      isOpen={isShowModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={hideModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-rowjustify-end">
        <button onClick={hideModal}>close</button>
        <div>I am a modal</div>
      </div>
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
    </Modal>
  );
});

export default memo(InfoDetailModal);
