
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../utils/api";

const OwnerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/owner")
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h3>My Hotel Bookings (Owner Dashboard)</h3>
        {bookings.length === 0 ? (
          <p>No one has booked your hotels yet.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Guest Name</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Guests</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => {
                if (!b.listing) return null; // Skip if listing deleted
                return (
                  <tr key={b._id}>
                    <td>{b.listing.title}</td>
                    <td>{b.user.name || b.user.email}</td>
                    <td>{new Date(b.startDate).toLocaleDateString()}</td>
                    <td>{new Date(b.endDate).toLocaleDateString()}</td>
                    <td>{b.guests}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
