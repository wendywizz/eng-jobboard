import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function ModalConfirm({
  title,
  content,
  toggle,
  onAction,
  textConfirm = "Yes",
  textCancel = "No",
  ...props
}) {
  return (
    <Modal {...props}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onAction}>
          {textConfirm}
        </Button>
        <Button onClick={toggle}>{textCancel}</Button>
      </ModalFooter>
    </Modal>
  );
}
