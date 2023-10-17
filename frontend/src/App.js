import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./components/Contact"; // Assuming the component name is ContactList

function App() {
  const [contacts, setContacts] = useState([]); // Change the state variable name to 'contacts'

  useEffect(() => {
    fetch("http://localhost/api/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data)) // Update the state variable name to 'contacts'
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="page">
      <ContactList
        heading="Contactor"
        contacts={contacts}
        setContact={setContacts}
      />
    </div>
  );
}

export default App;
