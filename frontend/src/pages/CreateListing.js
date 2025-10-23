
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Layout from "../components/Layout";

const CreateListing = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: { filename: "", url: "" },
  });

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("image.")) {
      setListing((prev) => ({
        ...prev,
        image: { ...prev.image, [name.split(".")[1]]: value },
      }));
    } else {
      setListing((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/listings", listing); // JWT cookie sent automatically
      navigate("/listings");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create listing. Are you logged in?");
    }
  };

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-8 offset-md-2">
          <h3 className="mb-4 text-center">Add Your Property</h3>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label"><b>Title</b></label>
              <input
                name="title"
                type="text"
                className="form-control"
                value={listing.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label"><b>Description</b></label>
              <textarea
                name="description"
                className="form-control"
                value={listing.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image URL */}
            <div className="mb-3">
              <label className="form-label"><b>Image URL</b></label>
              <input
                name="image.url"
                type="text"
                className="form-control"
                value={listing.image.url}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price + Country in one row */}
            <div className="row">
              <div className="mb-3 col-md-4">
                <label className="form-label"><b>Price</b></label>
                <input
                  name="price"
                  type="number"
                  className="form-control"
                  value={listing.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-8">
                <label className="form-label"><b>Country</b></label>
                <input
                  name="country"
                  type="text"
                  className="form-control"
                  value={listing.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label"><b>Location</b></label>
              <input
                name="location"
                type="text"
                className="form-control"
                value={listing.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button className="btn btn-success px-4 mt-3">Add Property</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateListing;
