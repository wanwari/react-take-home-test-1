import { IContact } from "../data/contacts";

export const isFormValid = (contact: IContact) => {
  return contact.id.length > 0 && contact.name.length > 0;
};

export const sortList = (contacts: IContact[]): IContact[] => {
  return contacts.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    else return 0;
  });
};

export const filterContacts = (contact: IContact[], value: string) => {
  return contact.filter((contact) =>
    contact.name.toLowerCase().includes(value.toLowerCase())
  );
};
