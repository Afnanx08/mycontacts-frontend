// src/components/ContactEditor.tsx
import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';

interface Contact {
    id?: number;
    name: string;
    email: string;
    phone: string;
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ContactEditor: FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contact, setContact] = useState<Contact>({ name: '', email: '', phone: '' });
    const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_API_BASE_URL}/api/contacts`);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedContactId) {
            await updateContact(selectedContactId);
        } else {
            await createContact();
        }
        fetchContacts();
        setContact({ name: '', email: '', phone: '' });
    };

    const createContact = async () => {
        try {
            await axios.post(`${VITE_API_BASE_URL}/api/contacts`, contact);
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    };

    const updateContact = async (id: number) => {
        try {
            await axios.put(`${VITE_API_BASE_URL}/api/contacts/${id}`, contact);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleEdit = (contact: Contact) => {
        setContact(contact);
        setSelectedContactId(contact.id || null);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${VITE_API_BASE_URL}/api/contacts/${id}`);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div>
            <h1>Contact Editor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                />
                <button type="submit">{selectedContactId ? 'Update' : 'Create'} Contact</button>
            </form>
            {isLoading ? (
                <p>Loading contacts...</p>
            ) : (
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            {contact.name} - {contact.email} - {contact.phone}
                            <button onClick={() => handleEdit(contact)}>Edit</button>
                            <button onClick={() => handleDelete(contact.id!)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactEditor;
