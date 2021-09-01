import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

export default function ModalConfirmAction({title, text,  onSubmit, buttonText, buttonColor="primary", textSubmit="Yes", textClose="No", ...props}) {
  const [modal, setModal] = useState(false);
  const [progressing, setProgressing] = useState(false)

  const toggle = () => setModal(!modal);

  const _handleSubmit = () => {
    if (onSubmit) {
      setProgressing(true)

      setTimeout(async () => {
        await onSubmit()        

        setModal(false)      
        setProgressing(false)
      }, 1000)
    }    
  }  

  return (
    <div>
      <Button color={buttonColor} onClick={toggle}>{buttonText}</Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className} {...props} backdrop={progressing ? "static" : true}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={progressing} onClick={_handleSubmit}>
            {progressing ? <Spinner size="sm" /> : textSubmit}            
          </Button>
          <Button color="secondary" disabled={progressing} onClick={toggle}>{textClose}</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}