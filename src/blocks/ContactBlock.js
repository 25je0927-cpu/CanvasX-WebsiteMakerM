import React from "react";
import "./ContactBlock.css";

export default function ContactBlock({ content, onChange }) {
  return (
    <div className="block-contact">

      <div>
        <h3>Contact Information</h3>
      </div>
       <h5>Phone Number</h5>
       <input
        type="tel"
        placeholder="Phone number"
        defaultValue={content.phone || ""}
        onBlur={(e) => onChange({ phone: e.target.value })}
      />
      <h5>Email Address</h5>
      <input
        type="email"
        placeholder="Email address"
        defaultValue={content.email || ""}
        onBlur={(e) => onChange({ email: e.target.value })}
      />
      <h5>Message</h5>
      <textarea
        placeholder="Your message"
        defaultValue={content.message || ""}
        onBlur={(e) => onChange({ message: e.target.value })}
      />

      
    </div>
  );
}
