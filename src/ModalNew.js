
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalNew() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="mt-2" variant="primary" onClick={() => setShow(true)}>
      Mandatory Instruction To Start App
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          Mandatory Instruction To Start App
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          <h3>Initial Essentials To Run App</h3>
          <div>
          <h4>Login default set to admin</h4>
          <p> Use Demo Credentials</p>
          <p>Email: 1999shubhamjoshi@gmail.com</p>
          <p>Password: 123</p>
          </div>

       
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

 export default ModalNew;