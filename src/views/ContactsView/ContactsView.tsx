import { useCallback, useEffect, useState } from "react";
import { useContacts } from "./hooks/useContacts";
import { IContact, ResponseStatus } from "../../data/contacts/types";
import { ContactCard } from "./ContactCard";
import { AddContact } from "./AddContact";
import { Form, Spinner, Stack, Button } from "react-bootstrap";
import { filterContacts, sortList } from "../../util/helpers";

export const ContactsView = () => {
  const { listContacts } = useContacts();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [searchText, setSearchText] = useState("");

  const getContactList = useCallback(async () => {
    setLoadingContacts(true);
    try {
      const result = await listContacts();
      if (result.status === ResponseStatus.Success && result.data) {
        const sortedList = sortList(result.data);
        setContacts(sortedList);
        setFilteredContacts(sortedList);
      }
    } catch (err) {
      console.log(err);
    }
    setLoadingContacts(false);
  }, []);

  useEffect(() => {
    getContactList();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilteredContacts(filterContacts(contacts, value));
  };

  const clearSearch = () => {
    setSearchText("");
    setFilteredContacts(contacts);
  };

  return (
    <>
      {loadingContacts ? (
        <Spinner />
      ) : (
        <Stack direction="vertical" gap={3}>
          <AddContact updateList={getContactList} />
          <Stack direction="horizontal" gap={2}>
            <Form.Control
              type="text"
              id="search"
              value={searchText}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search By Name"
            />
            <Button onClick={clearSearch}>Clear</Button>
          </Stack>
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              updateList={getContactList}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
