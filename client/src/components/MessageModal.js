import React from 'react';
import { useAuth0 } from "../react-auth0-spa";

function MessageModal() {

  const {modal, modalCopy} = useAuth0();
  let [modalState/*, setModalState*/] =  modal;
  let [modalCopyState /*, setModalCopyState */] =  modalCopy;

  return(
    <React.Fragment>
      <section id="MessageModal" className={ modalState }>
        <p id="ModalMessage">{modalCopyState}</p>
      </section>
    </React.Fragment>
  );
}

export default MessageModal