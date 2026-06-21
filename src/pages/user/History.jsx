import { useEffect, useState } from "react";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    const updatedHistory = history.map(
      (order, index) => {
        if (index === 0) {
          return {
            ...order,
            status: "Processing",
          };
        }

        if (index === 1) {
          return {
            ...order,
            status: "On Delivery",
          };
        }

        return {
          ...order,
          status: "Completed",
        };
      }
    );

    setOrders(updatedHistory);
  }, []);

  const formatRupiah = (angka) => {
    return Number(angka).toLocaleString(
      "id-ID"
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}

        <section className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.4em] font-black text-amber-700 mb-4">
            Coffee Journey
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            ORDER
            <span className="text-amber-700">
              {" "}
              HISTORY
            </span>
          </h1>

          <p className="text-stone-500 mt-5 max-w-xl text-lg">
            Semua perjalanan kopi favoritmu
            tersimpan di sini.
          </p>
        </section>

        {/* EMPTY */}

        {orders.length === 0 && (
          <div className="bg-stone-50 rounded-[3rem] p-16 text-center">
            <div className="text-7xl mb-6">
              ☕
            </div>

            <h2 className="text-3xl font-black mb-4">
              Belum Ada Pesanan
            </h2>

            <p className="text-stone-500">
              Riwayat transaksi akan muncul
              setelah kamu melakukan checkout.
            </p>
          </div>
        )}

        {/* GRID */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="
              bg-stone-50
              rounded-[3rem]
              overflow-hidden
              border
              border-stone-100
              hover:shadow-2xl
              transition-all
              duration-500
              group
              "
            >
              {/* IMAGE */}

              <div className="h-72 overflow-hidden">
                <img
                  src={
                    order.image ||
                    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                  }
                  alt={order.product}
                  className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-105
                  transition-all
                  duration-700
                  "
                />
              </div>

              {/* CONTENT */}

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`
                    px-4
                    py-2
                    rounded-full
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest

                    ${
                      order.status ===
                      "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status ===
                          "On Delivery"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }
                    `}
                  >
                    {order.status}
                  </span>
                </div>

                <h2 className="text-2xl font-black tracking-tight mb-2">
                  {order.product}
                </h2>

                <p className="text-stone-500 text-sm mb-5">
                  {order.date}
                </p>

                <div className="space-y-2 mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">
                      Invoice
                    </p>

                    <p className="font-bold">
                      {order.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">
                      Total
                    </p>

                    <p className="text-2xl font-black text-amber-700">
                      Rp{" "}
                      {formatRupiah(
                        order.total
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedOrder(order)
                  }
                  className="
                  w-full
                  bg-stone-900
                  hover:bg-amber-700
                  text-white
                  h-14
                  rounded-2xl
                  font-black
                  uppercase
                  tracking-widest
                  transition-all
                  "
                >
                  Detail Pesanan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}

        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
            <div className="bg-white rounded-[3rem] max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black">
                  Detail Pesanan
                </h2>

                <button
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                  className="text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-5">
                {selectedOrder.items?.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="
                      flex
                      items-center
                      gap-4
                      bg-stone-50
                      rounded-3xl
                      p-4
                      "
                    >
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-black">
                          {item.nama}
                        </h3>

                        <p className="text-stone-500">
                          Qty :
                          {item.jumlah}
                        </p>
                      </div>

                      <h3 className="font-black text-amber-700">
                        Rp{" "}
                        {formatRupiah(
                          item.harga *
                            item.jumlah
                        )}
                      </h3>
                    </div>
                  )
                )}
              </div>

              <div className="mt-8 bg-stone-900 text-white rounded-[2rem] p-6">
                <p className="text-stone-400 text-sm">
                  Total Pembayaran
                </p>

                <h3 className="text-3xl font-black text-amber-500">
                  Rp{" "}
                  {formatRupiah(
                    selectedOrder.total
                  )}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default History;