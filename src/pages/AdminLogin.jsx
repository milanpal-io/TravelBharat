import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (!adminId.trim() || !password) {
      setError("Please enter Admin ID and Password.");
      return;
    }

    setLoading(true);

    // Temporary credentials
    const ADMIN_ID = "admin";
    const ADMIN_PASSWORD = "TravelBharat@123";

    setTimeout(() => {
      if (
        adminId.trim() === ADMIN_ID &&
        password === ADMIN_PASSWORD
      ) {
        localStorage.setItem(
          "travelbharat_admin",
          "true"
        );

        navigate("/admin/dashboard");
      } else {
        setError("Invalid Admin ID or Password.");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-red-700 px-6 py-12">

      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">

        <div className="w-full max-w-md">

          {/* Logo */}

          <div className="mb-8 text-center text-white">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl">
              🇮🇳
            </div>

            <h1 className="mt-4 text-3xl font-black">
              TravelBharat
            </h1>

            <p className="mt-2 text-orange-100">
              Admin Control Panel
            </p>

          </div>


          {/* Login Card */}

          <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">

            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Secure Access
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              Admin Login
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to manage TravelBharat content.
            </p>


            {/* Error */}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                ⚠️ {error}
              </div>
            )}


            {/* Form */}

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              {/* Admin ID */}

              <div>

                <label
                  htmlFor="adminId"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Admin ID
                </label>

                <input
                  id="adminId"
                  type="text"
                  value={adminId}
                  onChange={(event) =>
                    setAdminId(event.target.value)
                  }
                  placeholder="Enter Admin ID"
                  autoComplete="username"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />

              </div>


              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter Password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3.5 pr-20 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm font-bold text-gray-500 hover:bg-gray-100"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In →"}
              </button>

            </form>


            {/* Back */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 w-full text-center text-sm font-bold text-gray-500 hover:text-orange-500"
            >
              ← Back to TravelBharat
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default AdminLogin;