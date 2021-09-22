import React, { ChangeEventHandler, MutableRefObject } from "react";
import { Form } from "react-bootstrap";

type FormInputType = {
  label: string;
  type: string;
  placeholder?: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  value?: number | string;
  onChange?: ChangeEventHandler;
  isInvalid?: boolean;
  name?: string
};

const FormInput: React.FC<FormInputType> = (props) => {
  return (
    <Form.Group className="mb-3 w-100" >
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        isInvalid={props.isInvalid}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        ref={props.inputRef}
        onChange={props.onChange}
      />
    </Form.Group>
  );
};

export default FormInput;
