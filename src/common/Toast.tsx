import { Toast, ToastContainer } from "react-bootstrap";
import { ToastStatus } from "../data/contacts/types";

interface Props {
  show: boolean;
  status: ToastStatus;
  message: string;
  handleClose: () => void;
}

export const ToastModal = ({ show, handleClose, status, message }: Props) => {
  return (
    <ToastContainer position="bottom-center" className="mb-4">
      <Toast
        onClose={handleClose}
        show={show}
        bg={status.toLocaleLowerCase()}
        autohide
        delay={3000}
      >
        <Toast.Header>
          <strong className="me-auto">Result</strong>
        </Toast.Header>
        <Toast.Body className="bg-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
