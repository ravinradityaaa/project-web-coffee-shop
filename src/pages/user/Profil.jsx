import { useEffect, useState } from "react";

const Profil = () => {
  const [preview, setPreview] = useState(
    "https://i.pravatar.cc/500"
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [totalOrders, setTotalOrders] =
    useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const savedProfile = JSON.parse(
      localStorage.getItem("userProfile")
    );

    if (savedProfile) {
      setUser(savedProfile);

      if (savedProfile.photo) {
        setPreview(savedProfile.photo);
      }
    }

    const history =
      JSON.parse(localStorage.getItem("history")) ||
      [];

    setTotalOrders(history.length);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);

      setUser((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        ...user,
        photo: preview,
      })
    );

    alert("Profil berhasil diperbarui");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <section className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.4em] font-black text-amber-700 mb-4">
            My Account
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            MY
            <span className="text-amber-700">
              {" "}PROFILE
            </span>
          </h1>

          <p className="text-stone-500 mt-5 max-w-xl text-lg">
            Kelola informasi akun dan nikmati
            pengalaman terbaik bersama Kopi Wae.
          </p>
        </section>

        <div className="grid lg:grid-cols-[380px_1fr] gap-10">

          {/* SIDEBAR */}

          <div className="space-y-8">

            {/* PROFILE CARD */}

            <div className="bg-stone-50 rounded-[3rem] p-8 border border-stone-100">

              <div className="flex flex-col items-center">

                <div className="relative">

                  <img
                    src={preview}
                    alt="Profile"
                    className="
                    w-44
                    h-44
                    rounded-full
                    object-cover
                    border-4
                    border-white
                    shadow-xl
                    "
                  />

                  <label
                    className="
                    absolute
                    bottom-2
                    right-2
                    bg-amber-700
                    text-white
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:bg-amber-800
                    transition
                    "
                  >
                    +

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={
                        handlePhotoChange
                      }
                    />
                  </label>

                </div>

                <h2 className="text-3xl font-black mt-6 text-center">
                  {user.name || "Coffee Lover"}
                </h2>

                <span
                  className="
                  mt-4
                  bg-amber-100
                  text-amber-700
                  px-5
                  py-2
                  rounded-full
                  text-xs
                  font-black
                  uppercase
                  tracking-widest
                  "
                >
                  Gold Member
                </span>

              </div>
            </div>

            {/* STATS */}

            <div className="bg-stone-900 text-white rounded-[3rem] p-8">

              <h3 className="text-xl font-black mb-6">
                Statistics
              </h3>

              <div className="grid grid-cols-3 gap-4">

                <div className="text-center">
                  <h4 className="text-3xl font-black text-amber-500">
                    {totalOrders}
                  </h4>

                  <p className="text-xs uppercase tracking-widest text-stone-400">
                    Orders
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-3xl font-black text-amber-500">
                    12
                  </h4>

                  <p className="text-xs uppercase tracking-widest text-stone-400">
                    Favorite
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-3xl font-black text-amber-500">
                    350
                  </h4>

                  <p className="text-xs uppercase tracking-widest text-stone-400">
                    Points
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* CONTENT */}

          <div className="space-y-8">

            {/* PERSONAL INFO */}

            <section className="bg-stone-50 rounded-[3rem] p-8 border border-stone-100">

              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.3em] font-black text-amber-700 mb-3">
                  Personal Information
                </p>

                <h2 className="text-3xl font-black">
                  Informasi Akun
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="
                  bg-white
                  rounded-2xl
                  border
                  border-stone-200
                  px-5
                  py-4
                  outline-none
                  focus:border-amber-700
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="
                  bg-white
                  rounded-2xl
                  border
                  border-stone-200
                  px-5
                  py-4
                  outline-none
                  focus:border-amber-700
                  "
                />

                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  className="
                  bg-white
                  rounded-2xl
                  border
                  border-stone-200
                  px-5
                  py-4
                  outline-none
                  focus:border-amber-700
                  "
                />

              </div>

              <textarea
                rows="5"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Alamat Lengkap"
                className="
                w-full
                mt-5
                bg-white
                rounded-2xl
                border
                border-stone-200
                px-5
                py-4
                resize-none
                outline-none
                focus:border-amber-700
                "
              />

              <button
                onClick={handleSave}
                className="
                mt-8
                bg-stone-900
                hover:bg-amber-700
                text-white
                h-14
                px-10
                rounded-2xl
                font-black
                uppercase
                tracking-widest
                transition-all
                "
              >
                Save Changes
              </button>

            </section>

            {/* MEMBERSHIP */}

            <section className="bg-gradient-to-r from-amber-700 to-amber-500 text-white rounded-[3rem] p-8">

              <p className="text-[11px] uppercase tracking-[0.3em] font-black mb-3">
                Membership
              </p>

              <h2 className="text-4xl font-black mb-4">
                GOLD MEMBER
              </h2>

              <p className="max-w-xl opacity-90">
                Nikmati promo eksklusif,
                cashback spesial, dan akses
                prioritas untuk produk terbaru
                dari Kopi Wae.
              </p>

            </section>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Profil;