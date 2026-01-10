"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request sent successfully!");
    setFormData({
      name: "",
      email: "",
      bookingDate: "",
      comment: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className={css.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className={css.input}
          required
        />

        <input
          type="date"
          name="bookingDate"
          placeholder="Booking date*"
          value={formData.bookingDate}
          onChange={handleChange}
          className={css.input}
          required
        />

        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          className={css.textarea}
          rows={4}
        />

        <button type="submit" className="button button--primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
