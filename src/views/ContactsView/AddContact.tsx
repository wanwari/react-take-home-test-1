import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { IContact } from "../../data/contacts";
import { generateUUID } from "../../util/guid";
import { useContacts } from "./hooks/useContacts";
import {
  IApiResponse,
  IToastData,
  ToastStatus,
} from "../../data/contacts/types";
import { isFormValid } from "../../util/helpers";
import { ToastModal } from "../../common/Toast";

interface Props {
  updateList: () => void;
}

export const AddContact = ({ updateList }: Props) => {
  const { addContact } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState<IContact>({
    id: generateUUID(),
    name: "",
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastData, setToastData] = useState<IToastData>({
    status: ToastStatus.Info,
    message: "",
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setShowModal(true);

  const handleClose = () => {
    setShowToast(false);
    setState({
      id: generateUUID(),
      name: "",
    });
    setShowModal(false);
  };

  const handleSaveClicked = (event: React.MouseEvent<HTMLElement>) => {
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setLoading(true);
      handleSubmit();
    }

    setValidated(true);
  };

  const handleSubmit = async () => {
    try {
      if (isFormValid(state)) {
        await addContact(state);
        handleClose();
        updateList();
      }
    } catch (err) {
      const error = err as IApiResponse;
      setToastData({
        status: ToastStatus.Danger,
        message: error.error || "",
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="float-end"
        variant="outline-primary"
      >
        Add Contact
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                required
                value={state.name || ""}
                onChange={(event) =>
                  setState({ ...state, name: event.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                id="phone"
                value={state.phone || ""}
                onChange={(event) =>
                  setState({ ...state, phone: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                id="age"
                value={state.age || 0}
                onChange={(event) =>
                  setState({ ...state, age: +event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={state.email || ""}
                onChange={(event) =>
                  setState({ ...state, email: event.target.value })
                }
                placeholder="Email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClicked}>
            {loading ? <Spinner size="sm" /> : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastModal
        status={toastData?.status}
        message={toastData?.message}
        show={showToast}
        handleClose={() => setShowToast(false)}
      />
    </>
  );
};
