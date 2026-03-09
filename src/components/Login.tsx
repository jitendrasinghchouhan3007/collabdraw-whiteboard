import React, { useState } from 'react';
import { User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      const data = await res.json();

  if (res.ok) {
  onLogin(data);
  navigate('/');
}
else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 relative overflow-hidden">

      {/* Background Pattern Space */}
      <div className="absolute inset-0 opacity-40">
        {/* background image / pattern if needed */}
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[520px] bg-white rounded-2xl shadow-xl px-4 sm:px-8 py-8 sm:py-10 mx-4 sm:mx-0">

        {/* Heading */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Sign In
        </h2>

        <p className="text-center text-sm text-gray-500 mt-1">
          Enter your username and let’s get started
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter Username"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3245FF] focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#3245FF] hover:bg-[#1B2DFB] text-white font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Please wait...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Login <ArrowRight size={16} />
              </span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;