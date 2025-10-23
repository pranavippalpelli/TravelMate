
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import Layout from "../components/Layout";

const AllListings = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");

  const fetchListings = () => {
    API.get("/listings", { params: { search } })
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchListings();
  }, [search]);

  return (
    <Layout>
      <h1 style={{
  textAlign: "center",
  fontSize: "2rem",
  fontWeight: "600",
  color: "#1a1a1a",
  margin: "1rem 0"
}}>
   Welcome to TravelMate - Explore Hotels, Resorts, and Destinations
</h1>

      {/* Search bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-1 mt-3">
        {listings.map(listing => (
          <div key={listing._id} className="col mb-4">
            <Link to={`/listings/${listing._id}`} className="text-decoration-none">
              <div className="card listing-card h-100">
                <img
                  src={listing.image?.url || ""}
                  className="card-img-top"
                  alt={listing.title}
                  style={{ height: "20rem", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="card-text">
                    <b>{listing.title}</b> <br />
                    &#8377; {listing.price} /Night
                    <i className="tax-info">&nbsp;+18% GST</i>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AllListings;


