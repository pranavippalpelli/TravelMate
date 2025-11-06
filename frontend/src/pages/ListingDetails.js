
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import API from "../utils/api";
// import Layout from "../components/Layout";

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [listing, setListing] = useState(null);
//   const [user, setUser] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

//   useEffect(() => {
//     API.get("/auth/me")
//       .then(res => setUser(res.data))
//       .catch(() => setUser(null));
//   }, []);

//   const fetchListing = () => {
//     API.get(`/listings/${id}`).then(res => {
//       setListing(res.data);
//       setReviews(res.data.reviews || []);
//     });
//   };

//   useEffect(() => {
//     fetchListing();
//   }, [id]);

//   const handleDeleteListing = async () => {
//     try {
//       await API.delete(`/listings/${id}`);
//       navigate("/listings");
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to delete");
//     }
//   };

//   const handleAddReview = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post(`/reviews/${id}`, newReview);
//       setNewReview({ rating: 5, comment: "" });
//       fetchListing();
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to add review");
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       await API.delete(`/reviews/${reviewId}`);
//       fetchListing();
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to delete review");
//     }
//   };

//   if (!listing) return <p>Loading...</p>;

//   const isOwner = user && listing.owner && (listing.owner._id === user._id);

//   return (
//     <Layout>
//       <div className="row mt-3 mb-3">
//         <div className="col-md-6 offset-md-3">
//           <div className="card listing-card">
//             <img src={listing.image?.url} className="card-img-top show-img" alt={listing.title} />
//             <div className="card-body">
//               <h5 className="card-title">{listing.title}</h5>
//               <p className="card-text">{listing.description}</p>
//               <p className="card-text">
//                 Price Per Day: <b>₹{listing.price}/- </b> <br />
//                 Location: {listing.location}, {listing.country}
//               </p>
//               <p>Posted by: <b>@{listing.owner?.name || listing.owner?.email}</b></p>

//               {/* <div className="d-flex justify-content-evenly mt-3">
//                 {isOwner ? (
//                   <>
//                     <Link to={`/listings/${id}/edit`} className="btn btn-dark">Edit</Link>
//                     <button onClick={handleDeleteListing} className="btn btn-dark">Delete</button>
//                   </>
//                 ) : (
//                   <button className="btn btn-secondary" disabled>Login required to proceed with booking.</button>
//                 )}
//               </div> */}
              
//               <div className="d-flex justify-content-evenly mt-3">
//                 {isOwner ? (
//                     <>
//                       <Link to={`/listings/${id}/edit`} className="btn btn-dark">
//                           Edit
//                       </Link>
//                       <button onClick={handleDeleteListing} className="btn btn-dark">
//                           Delete
//                       </button>
//                     </>
//                   ) : !user ? (
//                       <button className="btn btn-secondary" disabled>
//                           Login required to proceed with booking.
//                       </button>
//                   ) : (
//                     <Link to={`/book/${listing._id}`} className="btn btn-success px-4">
//                       Book Now
//                     </Link>
//                   )}
//                 </div>

//             </div>
//           </div>


          
//             {/* book now page
//             {user && !isOwner && (
//               <div className="text-center mt-3">
//                   <Link to={`/book/${listing._id}`} className="btn btn-success px-4">Book Now</Link>
//                 </div>
//             )} */}


//           {/* Reviews Section */}
//           <div className="mt-4">
//             <h5>Reviews</h5>
//             {reviews.length === 0 && <p>No reviews yet.</p>}
//             {reviews.map((review) => {
//               const isReviewOwner = user && (review.author._id === user._id);
//               return (
//                 <div key={review._id} className="border p-2 mb-2 rounded">
//                   <p><b>@{review.author.name || review.author.email}</b> (rated: {review.rating}/5)</p>
//                   <p>{review.comment}</p>
//                   {isReviewOwner && (
//                     <button className="btn btn-sm btn-danger" onClick={() => handleDeleteReview(review._id)}>Delete</button>
//                   )}
//                 </div>
//               );
//             })}

//             <br/>
            
//             {/* Add Review Form */}
//             {user && (
//               <form onSubmit={handleAddReview} className="mt-3">
//                 <h5>Add Reviews</h5>
//                 <div className="mb-2">
//                   <label className="form-label"><b>Rating</b></label>
//                   <select className="form-select" value={newReview.rating} onChange={(e) => setNewReview(prev => ({ ...prev, rating: e.target.value }))}>
//                     {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
//                   </select>
//                 </div>
//                 <div className="mb-2">
//                   <label className="form-label"><b>Comment</b></label>
//                   <textarea className="form-control" value={newReview.comment} onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))} required />
//                 </div>
//                 <button className="btn btn-success">Add Review</button>
//               </form>
//             )}
            
            
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ListingDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import Layout from "../components/Layout";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    API.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const fetchListing = () => {
    API.get(`/listings/${id}`).then(res => {
      setListing(res.data);
      setReviews(res.data.reviews || []);
    });
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  const handleDeleteListing = async () => {
    try {
      await API.delete(`/listings/${id}`);
      navigate("/listings");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/reviews/${id}`, newReview);
      setNewReview({ rating: 5, comment: "" });
      fetchListing();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await API.delete(`/reviews/${reviewId}`);
      fetchListing();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete review");
    }
  };

  if (!listing) return <p>Loading...</p>;

  const isOwner = user && listing.owner && (listing.owner._id === user._id);

  return (
    <Layout>
      <div className="row mt-3 mb-3">
        <div className="col-md-6 offset-md-3">
          <div className="card listing-card">
            <img src={listing.image?.url} className="card-img-top show-img" alt={listing.title} />
            <div className="card-body">
              <h5 className="card-title">{listing.title}</h5>
              {/* 👇 Added Author and Date */}
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Posted by @{listing.owner?.name || listing.owner?.email} •{" "}
                {new Date(listing.createdAt).toLocaleDateString()}
              </p>

              <p className="card-text">{listing.description}</p>
              <p className="card-text">
                Price Per Day: <b>₹{listing.price}/- </b> <br />
                Location: {listing.location}, {listing.country}
              </p>
              {/* <p>Posted by: <b>@{listing.owner?.name || listing.owner?.email}</b></p> */}

              <div className="d-flex justify-content-evenly mt-3">
                {isOwner ? (
                  <>
                    <Link to={`/listings/${id}/edit`} className="btn btn-dark">
                      Edit
                    </Link>
                    <button onClick={handleDeleteListing} className="btn btn-dark">
                      Delete
                    </button>
                  </>
                ) : !user ? (
                  <button className="btn btn-secondary" disabled>
                    Login required to proceed with booking.
                  </button>
                ) : (
                  <Link to={`/book/${listing._id}`} className="btn btn-success px-4">
                    Book Now
                  </Link>
                )}
              </div>

            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-4">
            <h5>Reviews</h5>
            {reviews.length === 0 && <p>No reviews yet.</p>}
            {reviews.map((review) => {
              const isReviewOwner = user && (review.author._id === user._id);
              return (
                <div key={review._id} className="border p-2 mb-2 rounded">
                  <p><b>@{review.author.name || review.author.email}</b> (rated: {review.rating}/5)</p>
                  <p>{review.comment}</p>
                  {isReviewOwner && (
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteReview(review._id)}>Delete</button>
                  )}
                </div>
              );
            })}

            <br/>

            {user && (
              <form onSubmit={handleAddReview} className="mt-3">
                <h5>Add Reviews</h5>
                <div className="mb-2">
                  <label className="form-label"><b>Rating</b></label>
                  <select className="form-select" value={newReview.rating} onChange={(e) => setNewReview(prev => ({ ...prev, rating: e.target.value }))}>
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label"><b>Comment</b></label>
                  <textarea className="form-control" value={newReview.comment} onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))} required />
                </div>
                <button className="btn btn-success">Add Review</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingDetails;
