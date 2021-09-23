import React from "react";
import ReactDOM from "react-dom";
import { FormService } from "../Form/FormService";
import "animate.css";
export const ModalService = ({
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  value,
  history,
}) => {
  return ReactDOM.createPortal(
    <aside
      tag="aside"
      role="dialog"
      tabIndex="-1"
      aria-modal="true"
      className="modal-cover animate__animated animate__fadeIn"
      onKeyDown={onKeyDown}
    >
      <div className="mini " ref={modalRef}>
        <div className="mini_content" style={{ width: "50%" }}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual"></span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <FormService value={value} close={closeModal} history={history} />
        </div>
      </div>
    </aside>,

    document.body
  );
};

export default ModalService;
