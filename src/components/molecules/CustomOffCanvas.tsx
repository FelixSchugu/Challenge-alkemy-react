import React from "react";
import { Offcanvas } from "react-bootstrap";
import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";

type OffCanvasTypes = {
  title?: string;
  placement?: OffcanvasPlacement;
  open: boolean;
  onClose: () => void;
};

const CustomOffCanvas: React.FC<OffCanvasTypes> = (props) => {
  return (
    <Offcanvas
      placement={props.placement}
      show={props.open}
      onHide={props.onClose}
      {...props}
    >
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>{props.children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default CustomOffCanvas;
