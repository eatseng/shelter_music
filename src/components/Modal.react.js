import React from 'react';

import './Modal.css';

const {useEffect} = React;

function Modal(props) {

  useEffect(() => {
    const keypressHandler = (e) => {
      if (e.code === 'Enter' || e.code === "Escape") {
        props.turnOff();
      }
    }
    document.addEventListener('keyup', keypressHandler)
    return () => document.removeEventListener('keyup', keypressHandler)
  })

  return (
    <div
      className="modal"
      style={{display: props.isModalOn === true ? 'flex' : 'none'}}>
      {props.children}
      <div className="modalScreen" />
    </div>
  );
}

export default Modal;
