import React, { ReactElement } from "react";
import { Modal } from "react-bootstrap";
import { JsxChild } from "typescript";

type ModalTypes = {
  modaltitle: string;
  modalbody: ReactElement;
  modalfooter: ReactElement;
  show: boolean;
  onHide: () => void;
};

const CustomModal: React.FC<ModalTypes> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modaltitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        {props.modalbody}
      </Modal.Body>
      <Modal.Footer>{props.modalfooter}</Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
