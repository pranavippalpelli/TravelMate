

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import Layout from "../components/Layout";

const BookingForm = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
  });

  useEffect(() => {
    API.get(`/listings/${listingId}`).then(res => setListing(res.data));
  }, [listingId]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.startDate || !form.endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      await API.post("/bookings", {
        listing: listingId,
        startDate: form.startDate,
        endDate: form.endDate,
        guests: form.guests,
      });
      alert("✅ Booking successful!");
      navigate("/my-bookings");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Booking failed. Please try again.");
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="container mt-4">
        <h3>Book: {listing.title}</h3>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light mt-3">
          <div className="mb-3">
            <label className="form-label"><b>Check-in Date</b></label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              required
              value={form.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label"><b>Check-out Date</b></label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              required
              value={form.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label"><b>Guests</b></label>
            <input
              type="number"
              name="guests"
              min="1"
              className="form-control"
              value={form.guests}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success px-4 mt-2">Confirm Booking</button>
        </form>
      </div>
    </Layout>
  );
};

export default BookingForm;
