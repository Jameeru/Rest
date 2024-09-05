import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';

const ContactPicker: React.FC = () => {
  const [contacts, setContacts] = useState<{ id: number; name: string }[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const db = await openDB('contacts-db', 1, {
        upgrade(db) {
          db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
        },
      });
      const allContacts = await db.getAll('contacts');
      setContacts(allContacts);
    };

    fetchContacts();
  }, []);

  const handleSelectContact = (id: number) => {
    const contact = contacts.find(c => c.id === id);
    setSelectedContact(contact ? contact.name : null);
  };

  return (
    <div>
      <h1>Contact Picker</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} onClick={() => handleSelectContact(contact.id)}>
            {contact.name}
          </li>
        ))}
      </ul>
      {selectedContact && <h2>Selected Contact: {selectedContact}</h2>}
    </div>
  );
};

export default ContactPicker;
