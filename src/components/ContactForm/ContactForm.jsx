import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  FormWrap,
  InputContainer,
  ContactLabel,
  ContactInput,
  AddContactButton,
} from './ContactForm.styled';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // Method that handles input changes and updates state
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Method that adds a contact when the form is submitted
  handleSubmitForm = event => {
    event.preventDefault();
    // Generate a unique ID for the new contact
    const newContact = {
      id: nanoid(),
      ...this.state,
    };
    // Invoke the onSubmit function (provided as a prop from the App) to add the new contact
    this.props.onSubmit(newContact);
    // Reset the form fields
    this.reset();
  };

  // Method that resets the form fields
  reset = () => {
    this.setState({ number: '', name: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <FormWrap type="submit" onSubmit={this.handleSubmitForm}>
        <InputContainer>
          <ContactLabel $hasValue={name}>Name</ContactLabel>
          <ContactInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </InputContainer>
        <InputContainer>
          <ContactLabel $hasValue={number}>Number</ContactLabel>
          <ContactInput
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </InputContainer>
        <AddContactButton type="submit">Add contact</AddContactButton>
      </FormWrap>
    );
  }
}
