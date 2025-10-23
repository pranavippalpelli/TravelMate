
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../utils/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my")
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h3>My Bookings</h3>
        {bookings.length === 0 ? (
          <p>You haven’t booked any hotels yet.</p>
        ) : (
          <div className="row mt-3">
            {bookings.map(b => {
              if (!b.listing) return null; // Prevent crash if listing deleted
              return (
                <div key={b._id} className="col-md-4 mb-4">
                  <div className="card shadow-sm">
                    <img
                      src={b.listing.image?.url || "https://via.placeholder.com/200"}
                      alt={b.listing.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5>{b.listing.title}</h5>
                      <p>{b.listing.location}, {b.listing.country}</p>
                      <p>
                        <b>Check-in:</b> {new Date(b.startDate).toLocaleDateString()} <br />
                        <b>Check-out:</b> {new Date(b.endDate).toLocaleDateString()} <br />
                        <b>Guests:</b> {b.guests}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBookings;
