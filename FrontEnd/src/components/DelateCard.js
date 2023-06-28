import React from "react";
import PopupWithForm from "./PopupWithForm";

function DelateCardPopup(props) {
  const { onClose,isOpen} = props;

  function handleSubmit(e) {
    e.preventDefault();
    props.eraseDelate(props.card);
    onClose()
  }
  return (
    <PopupWithForm
    name="delete_card"
    title="¿Estás seguro?"
    action="Si"
    isOpen={isOpen}
    onSubmit={handleSubmit}
    onCLose={onClose}
    ></PopupWithForm>
  );
}

export default DelateCardPopup;
