import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";

export default function ModalConfirm({
  title,
  content,
  toggle,
  disableButton = false,
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
        <Button color="primary" onClick={onAction} disabled={disableButton}>
          {disableButton ? <Spinner size="sm" /> : textConfirm}
        </Button>
        <Button onClick={toggle} disabled={disableButton}>{textCancel}</Button>
      </ModalFooter>
    </Modal>
  );
}
