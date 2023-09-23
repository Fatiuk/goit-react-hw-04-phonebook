import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  FormWrap,
  InputContainer,
  ContactLabel,
  ContactInput,
  AddContactButton,
} from './ContactForm.styled';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Method that adds a contact when the form is submitted
  const handleSubmitForm = event => {
    event.preventDefault();
    // Generate a unique ID for the new contact
    const newContact = {
      id: nanoid(),
      ...formData,
    };
    // Invoke the onSubmit function (provided as a prop from the App) to add the new contact
    onSubmit(newContact);
    // Reset the form fields
    reset();
  };

  // Method that resets the form fields
  const reset = () => {
    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <FormWrap type="submit" onSubmit={handleSubmitForm}>
      <InputContainer>
        <ContactLabel $hasValue={formData.name}>Name</ContactLabel>
        <ContactInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </InputContainer>
      <InputContainer>
        <ContactLabel $hasValue={formData.number}>Number</ContactLabel>
        <ContactInput
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputContainer>
      <AddContactButton type="submit">Add contact</AddContactButton>
    </FormWrap>
  );
};

export default ContactForm;
