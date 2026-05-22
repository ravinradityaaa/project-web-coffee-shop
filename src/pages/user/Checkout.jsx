// src/pages/user/Checkout.jsx

import React from "react";
import "../styles/checkout.css";

const cartItems = [
  {
    id: 1,
    name: "Dark Espresso",
    desc: "Strong and bold espresso taste.",
    price: 32000,
    qty: 2,
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Caramel Latte",
    desc: "Sweet creamy caramel coffee.",
    price: 45000,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },
];

const Checkout = () => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shipping = 12000;
  const total = subtotal + shipping;

  return (
    <div className="checkout-page">
      {/* HEADER */}
      <div className="checkout-top">
        <p>PREMIUM COFFEE EXPERIENCE</p>

        <h1>
          Checkout <span>Order</span>
        </h1>
      </div>

      {/* CONTENT */}
      <div className="checkout-container">
        {/* LEFT */}
        <div className="checkout-products">
          {cartItems.map((item) => (
            <div className="checkout-card" key={item.id}>
              <div className="checkout-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="checkout-info">
                <h2>{item.name}</h2>

                <p>{item.desc}</p>

                <div className="checkout-meta">
                  <span>
                    Qty : <b>{item.qty}</b>
                  </span>

                  <span>
                    Rp {item.price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="checkout-summary">
          <h2>Payment Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>
              Rp {shipping.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <span>
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="address-box">
            <h3>Delivery Address</h3>

            <p>
              Jl. Raya Margonda No. 88
              <br />
              Depok, Indonesia
            </p>
          </div>

          <button className="checkout-button">
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;