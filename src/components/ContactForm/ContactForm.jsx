import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  FormWrap,
  InputContainer,
  ContactLabel,
  ContactInput,
  AddContactButton,
} from './ContactForm.styled';

// Create a custom hook for handling input fields
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = event => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
}

const ContactForm = ({ onSubmit }) => {
  const nameInput = useFormInput('');
  const numberInput = useFormInput('');

  // Method that adds a contact when the form is submitted
  const handleSubmitForm = event => {
    event.preventDefault();
    // Generate a unique ID for the new contact
    const newContact = {
      id: nanoid(),
      name: nameInput.value,
      number: numberInput.value,
    };
    // Invoke the onSubmit function (provided as a prop from the App) to add the new contact
    onSubmit(newContact);
    // Reset the form fields
    reset();
  };

  // Method that resets the form fields
  const reset = () => {
    nameInput.onChange({ target: { value: '' } });
    numberInput.onChange({ target: { value: '' } });
  };

  return (
    <FormWrap type="submit" onSubmit={handleSubmitForm}>
      <InputContainer>
        <ContactLabel $hasValue={nameInput.value}>Name</ContactLabel>
        <ContactInput
          type="text"
          name="name"
          value={nameInput.value}
          onChange={nameInput.onChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </InputContainer>
      <InputContainer>
        <ContactLabel $hasValue={numberInput.value}>Number</ContactLabel>
        <ContactInput
          type="tel"
          name="number"
          value={numberInput.value}
          onChange={numberInput.onChange}
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
