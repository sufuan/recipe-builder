import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Have a question, suggestion, or just want to say hello? We'd love to
        hear from you! You can reach out to us by email, phone, or through our
        social media channels.
      </p>
      <p className="text-gray-700 mb-4">Email: info@example.com</p>
      <p className="text-gray-700 mb-4">Phone: +123-456-7890</p>
      <p className="text-gray-700 mb-4">Follow us on social media:</p>
      <ul className="text-gray-700 mb-4 list-disc pl-6">
        <li>Twitter: @example</li>
        <li>Facebook: example</li>
        <li>Instagram: @example</li>
      </ul>
      <p className="text-gray-700">We look forward to hearing from you!</p>
    </div>
  );
};

export default ContactUs;
