import {
  Button,
  Card,
  Collapse,
  Form,
  Stack,
  Tooltip,
  TooltipProps,
} from "react-bootstrap";
import { IContact } from "../../data/contacts";
import { useState } from "react";
import { useContacts } from "./hooks/useContacts";
import {
  IToastData,
  ResponseStatus,
  ToastStatus,
} from "../../data/contacts/types";
import { ConfirmDialog } from "../../common/ConfirmDialog";
import { isFormValid } from "../../util/helpers";
import { ToastModal } from "../../common/Toast";

interface Props {
  contact: IContact;
  updateList: () => void;
}

export const ContactCard = ({ contact, updateList }: Props) => {
  const { updateContact, deleteContact } = useContacts();
  const [state, setState] = useState<IContact>(contact);
  const [disableEditing, setDisableEditing] = useState<boolean>(true);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastData, setToastData] = useState<IToastData>({
    status: ToastStatus.Info,
    message: "",
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const displayTooltip = (props: TooltipProps) => (
    <Tooltip id="id-Tooltip" {...props}>
      {contact.id}
    </Tooltip>
  );

  const handleEditClick = () => setDisableEditing(false);

  const handleDialogOpen = () => setShowConfirm(true);

  const handleDialogClose = () => setShowConfirm(false);

  const handleSaveClicked = (event: React.MouseEvent<HTMLElement>) => {
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setLoading(true);
      handleSave();
    }

    setValidated(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteContact(state.id);
      if (result.status === ResponseStatus.Success) {
        setToastData({
          status: ToastStatus.Success,
          message: "Contact has been deleted",
        });
        setShowConfirm(false);
        setDisableEditing(true);
        setShowToast(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      updateList();
    }
  };

  const handleCancelClick = () => {
    setState(contact);
    setDisableEditing(true);
  };

  const update = async () => {
    try {
      const result = await updateContact(state);
      if (result.status === ResponseStatus.Success) {
        setToastData({
          status: ToastStatus.Success,
          message: "Contact has been updated",
        });
        setDisableEditing(true);
        setShowToast(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      updateList();
    }
  };

  const handleSave = () => {
    if (isFormValid(state)) {
      update();
    } else {
      setToastData({
        status: ToastStatus.Warning,
        message: "Please fill out the form",
      });
      setShowToast(true);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Form noValidate validated={validated}>
            <Stack direction="horizontal" className="mb-2">
              <div className="container w-100">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    required
                    value={state.name}
                    onChange={(event) =>
                      setState({ ...state, name: event.target.value })
                    }
                    disabled={disableEditing}
                    placeholder="Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Name is required
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <Button
                onClick={() => setShowDetails(!showDetails)}
                aria-controls="details"
                className="mt-4"
                aria-expanded={showDetails}
                disabled={!disableEditing}
              >
                {showDetails ? "Hide" : "Manage"}
              </Button>
            </Stack>
            <Collapse in={showDetails}>
              <div id="details" className="container">
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="phone"
                    id="phone"
                    value={state.phone}
                    onChange={(event) =>
                      setState({ ...state, phone: event.target.value })
                    }
                    disabled={disableEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    id="age"
                    value={state.age}
                    onChange={(event) =>
                      setState({ ...state, age: +event.target.value })
                    }
                    disabled={disableEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={state.email}
                    onChange={(event) =>
                      setState({ ...state, email: event.target.value })
                    }
                    disabled={disableEditing}
                  />
                </Form.Group>

                {disableEditing && (
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      variant="primary"
                      className="w-50"
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="w-50"
                      onClick={handleDialogOpen}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}

                {!disableEditing && (
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      variant="secondary"
                      className="w-50"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="success"
                      className="w-50"
                      onClick={handleSaveClicked}
                    >
                      Save
                    </Button>
                  </Stack>
                )}
              </div>
            </Collapse>
          </Form>
        </Card.Body>
      </Card>
      <ConfirmDialog
        show={showConfirm}
        handleClose={handleDialogClose}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this contact? This action cannot be undone."
      />
      <ToastModal
        status={toastData?.status}
        message={toastData?.message}
        show={showToast}
        handleClose={() => setShowToast(false)}
      />
    </>
  );
};
