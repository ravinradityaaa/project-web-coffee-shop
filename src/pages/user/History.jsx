// src/pages/user/History.jsx

import React from "react";
import "../styles/history.css";

const orders = [
  {
    id: "#INV-2026-001",
    product: "Dark Espresso",
    date: "15 Mei 2026",
    total: 64000,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "#INV-2026-002",
    product: "Caramel Latte",
    date: "14 Mei 2026",
    total: 45000,
    status: "On Delivery",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "#INV-2026-003",
    product: "Vanilla Cappuccino",
    date: "12 Mei 2026",
    total: 52000,
    status: "Processing",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
  },
];

const History = () => {
  return (
    <div className="history-page">
      {/* HEADER */}
      <div className="history-top">
        <p>YOUR COFFEE JOURNEY</p>

        <h1>
          Order <span>History</span>
        </h1>
      </div>

      {/* LIST */}
      <div className="history-container">
        {orders.map((order) => (
          <div className="history-card" key={order.id}>
            {/* IMAGE */}
            <div className="history-image">
              <img src={order.image} alt={order.product} />
            </div>

            {/* INFO */}
            <div className="history-info">
              <div className="history-left">
                <span className="invoice">
                  {order.id}
                </span>

                <h2>{order.product}</h2>

                <p>{order.date}</p>
              </div>

              <div className="history-right">
                <h3>
                  Rp {order.total.toLocaleString("id-ID")}
                </h3>

                <span
                  className={`status ${order.status}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;