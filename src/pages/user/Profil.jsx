// src/pages/user/Profil.jsx

import React, { useState } from "react";
import "../styles/profil.css";

const Profil = () => {
  const [user, setUser] = useState({
    name: "Roihan Firdaus",
    email: "roihan@gmail.com",
    phone: "08123456789",
    address: "Depok, Indonesia",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-top">
        <p>PREMIUM MEMBER ACCOUNT</p>

        <h1>
          My <span>Profile</span>
        </h1>
      </div>

      {/* CONTENT */}
      <div className="profile-container">
        
        {/* LEFT */}
        <div className="profile-sidebar">
          <div className="profile-image">
            <img
              src="https://i.pravatar.cc/400"
              alt="profile"
            />
          </div>

          <h2>{user.name}</h2>

          <span className="member-badge">
            Gold Coffee Member
          </span>

          {/* STATS */}
          <div className="profile-stats">
            <div className="stat-card">
              <h3>24</h3>
              <p>Total Orders</p>
            </div>

            <div className="stat-card">
              <h3>12</h3>
              <p>Favorite Menu</p>
            </div>

            <div className="stat-card">
              <h3>5</h3>
              <p>Coupons</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="profile-content">
          <div className="content-header">
            <h2>Edit Personal Information</h2>

            <p>
              Manage your account information and
              delivery details.
            </p>
          </div>

          <form className="profile-form">
            
            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Address</label>

              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </div>

            <button className="save-button">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profil;