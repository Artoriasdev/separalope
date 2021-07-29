import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal }) => {

  
  return (
    <button className="btn__aceptar" ref={buttonRef} onClick={showModal}>
      {triggerText}
    </button>
  );
};
export default Trigger;
