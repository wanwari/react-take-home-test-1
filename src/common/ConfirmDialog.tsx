import { Button, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  message: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const ConfirmDialog = ({
  show,
  message,
  handleClose,
  handleConfirm,
}: Props) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are You Sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
