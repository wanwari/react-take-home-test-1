import {
  apiAddContact,
  apiDeleteContact,
  apiFetchAllContacts,
  apiUpdateContact,
} from "../../../data/contacts";
import {
  IApiResponse,
  IContact,
  ResponseStatus,
} from "../../../data/contacts/types";

export const useContacts = () => {
  const listContacts = () => {
    return new Promise<IApiResponse>((resolve, reject) => {
      apiFetchAllContacts()
        .then((res) => resolve({ status: ResponseStatus.Success, data: res }))
        .catch((err) =>
          reject({ status: ResponseStatus.Error, error: err.message })
        );
    });
  };

  const addContact = async (contact: IContact) => {
    return new Promise<IApiResponse>((resolve, reject) => {
      apiAddContact(contact)
        .then((res) => resolve({ status: ResponseStatus.Success }))
        .catch((err) =>
          reject({ status: ResponseStatus.Error, error: err.message })
        );
    });
  };

  const updateContact = async (contact: IContact) => {
    return new Promise<IApiResponse>((resolve, reject) => {
      apiUpdateContact(contact)
        .then((res) => resolve({ status: ResponseStatus.Success }))
        .catch((err) =>
          reject({ status: ResponseStatus.Error, error: err.message })
        );
    });
  };

  const deleteContact = async (id: string) => {
    return new Promise<IApiResponse>((resolve, reject) => {
      apiDeleteContact(id)
        .then((res) => resolve({ status: ResponseStatus.Success }))
        .catch((err) =>
          reject({ status: ResponseStatus.Error, error: err.message })
        );
    });
  };

  return { listContacts, addContact, updateContact, deleteContact };
};
