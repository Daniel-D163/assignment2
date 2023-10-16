import { useState } from "react";
import Contact from "./Contact";
import Phone from "./Phone";

function Contactor(props) {
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
        props.setContact((contact) => [...contact, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNewContact(""); // Clear the input field
  }

  return (
    <div className="main">
      <h1>Contacts</h1>
      <input type="text" placeholder="Name" onChange={onChange} />
      <button className="contact-button" type="button" onClick={onClick}>
        Create Contact
      </button>
      <ul>
        {props.contact.map((contact) => (
          <Contact id={contact.id} name={contact.name} />
        ))}
      </ul>
    </div>
  );
}

export default Contactor;
