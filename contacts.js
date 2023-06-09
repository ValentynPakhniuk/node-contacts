const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.findIndex(contact => contact.id === contactId);
  if (contact === -1) {
    return null;
  }
  const [remove] = contacts.splice(contact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return remove;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
