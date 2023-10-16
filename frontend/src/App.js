import { useState, useEffect } from "react"; // import useEffect
import "./App.css";
import Contact from "./components/ContactList";

function App() {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetch("http://localhost/api/contacts")
      .then((response) => response.json())
      .then((data) => setContact(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="page">
      <Contact heading="Contactor" contact={contact} setContact={setContact} />
    </div>
  );
}

export default App;
