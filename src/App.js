import "./App.css";
import React, { Component } from "react";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList";
import Conteiner from "./components/Conteiner/Conteiner";
import shortid from "shortid";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;

    console.log(nextContacts);
    const prevContacts = prevState.contacts;
    console.log(prevContacts);
    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
    console.log("componentDidUpdate");
  }

  addContacts = (data) => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    const inIsContact = (e) => {
      return contact.name === e.name;
    };
    if (data.name === "" || data.number === "") {
      alert("Please make a correct contact");
      return;
    }
    if (this.state.contacts.some(inIsContact)) {
      alert(`${data.name} is already in contacts`);
    } else
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
  };

  deleteContact = (eventId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== eventId),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    const visibleContacts = this.state.contacts.filter(
      (contact) =>
        contact.name.includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );

    return (
      <>
        <Conteiner title="Phonebook">
          <Form onSubmit={this.addContacts} />
        </Conteiner>
        <Conteiner title="Contacts">
          {contacts.length > 0 ? (
            <>
              <Filter value={filter} onChange={this.changeFilter} />
              <ContactsList
                users={visibleContacts}
                ondeleteContact={this.deleteContact}
              />
            </>
          ) : (
            <span className="contact-message">
              You have not contacts yet, please add contact to phoneboock
            </span>
          )}
        </Conteiner>
      </>
    );
  }
}

export default App;
