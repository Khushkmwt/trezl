import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import API from '../server/axios';
import { motion } from 'framer-motion';
import { AtSign, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useUserStore();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleLogin = async () => {
    setError('');
    if (!identifier || !password) {
      return setError('Please fill in both fields');
    }

    const payload = isEmail(identifier)
      ? { email: identifier, password }
      : { username: identifier, password };

    try {
      setLoading(true);
      const res = await API.post('/users/login', payload);
      login(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/10"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Login to Your Account
        </h2>

        {/* Identifier Input */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <AtSign size={18} />
          </div>
          <input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Lock size={18} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-white/10 text-white rounded-xl border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm mb-2 text-center">{error}</p>}

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={handleLogin}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
