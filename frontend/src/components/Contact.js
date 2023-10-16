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
        props.setContact((contact) =>
          contact.map((contact) => {
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

  function onClick() {
    fetch(`http://localhost/api/contacts/${props.id}`, {
      method: "DELETE",
    })
      .then(() => {
        props.setContact((contact) =>
          contact.filter((contact) => contact.id !== props.id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <li>
      <div className="text-field-list">
        <button type="button" onClick={onClick} onChange={onChange}>
          DELETE
        </button>{" "}
      </div>
    </li>
  );
}

export default Contact;
