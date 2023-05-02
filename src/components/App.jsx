import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { FormAddContact } from './FormAddContact/FormAddContact';
import { Title } from './Title/Title';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState(() => {
    const storageContacts = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(storageContacts) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isContactName = contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isContactName) {
      toast.error(
        `Name "${newContact.name.toUpperCase()}" is alredy in contacts`
      );
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const findContact = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const getVisibleContacts = () =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <Layout>
        <FormAddContact onSubmit={addContact} />
      </Layout>
      <Layout>
        <Title title="Contacts" />
        <Filter search={filter} onSearch={findContact} />
        {visibleContacts && (
          <ContactList contacts={visibleContacts} onDelete={deleteContact} />
        )}
      </Layout>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
};
