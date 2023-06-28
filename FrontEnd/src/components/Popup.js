import React from "react";


function Popup(props) {
  const {onClose} = props
  return (
    <>
      <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
      >
        <div className="popup__overlay"
        onClick={onClose}
        />
        {props.children}
      </section>
    </>
  );
}

export default Popup
