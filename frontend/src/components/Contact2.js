import { useState } from "react";

function Contact(props) {
  function onChange() {
    const updatedContact = {
      id: props.id,
      name: props.name,
    };

    fetch(`http://localhost/api/contacts/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    })
      .then((response) => response.json())
      .then(() => {
        props.setContact((contacts) =>
          contacts.map((contact) => {
            if (contact.id === props.id) {
              return updatedContact;
            } else {
              return contact;
            }
          })
        );
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  function onClickDel() {
    fetch(`http://localhost/api/contacts/${props.id}`, {
      method: "DELETE",
    })
      .then(() => {
        props.setContact((contacts) =>
          contacts.filter((contact) => contact.id !== props.id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <li>
      <div className="text-field-list">
        <button type="button" onClick={onClickDel}>
          DELETE
        </button>
        <h3> {props.name} </h3>
      </div>
    </li>
  );
}

function ContactList(props) {
  const [newContact, setNewContact] = useState("");

  function onChange(event) {
    setNewContact(event.target.value);
  }

  function onClick() {
    fetch("http://localhost/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newContact }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setContact((contacts) => [...contacts, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNewContact(""); // Clear the input field
  }

  return (
    <div className="main">
      <h1> {props.heading} </h1>
      <div className="enclosingBox">
        <h2> Contacts </h2>
        <input
          type="text"
          placeholder="Please enter a name"
          onChange={onChange}
        />
        <button className="contact-button" type="button" onClick={onClick}>
          Create Contact
        </button>
        <hr className="solidLine" />
        {props.contact.map((contact) => (
          <Contact key={contact.id} name={contact.name} />
        ))}
      </div>
    </div>
  );
}

export default ContactList;
