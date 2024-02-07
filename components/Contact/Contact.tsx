import React, { useState } from "react";
import db from "../../firebase/firebase"; // Ensure this path is correct and db is properly exported
// New Firebase Modular SDK import
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styles from "./Contact.module.css"; // Convert CSS to module

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });

      // Reset form fields after submission
      setName("");
      setEmail("");
      setMessage("");
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className={styles.contactContainerPrime}>
      <div className={styles.contactContainer}>
        <h2>Contact Us</h2>
        <p>
          Have a question or feedback? Fill out the form below and we'll get
          back to you as soon as possible.
        </p>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label>
            <input
              className={styles.inputField}
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              className={styles.inputField}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <textarea
              className={styles.inputField}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
