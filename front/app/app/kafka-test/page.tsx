"use client";
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    console.log("test");
    const res = await fetch('http://localhost:3030/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Send Message to Kafka</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}