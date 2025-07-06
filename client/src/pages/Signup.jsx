import { motion } from 'framer-motion';
import { User, Mail, Lock, AtSign, Eye, EyeOff } from 'lucide-react';
import API from '../server/axios';
import useUserStore from '../store/userStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputField = ({ icon: Icon, placeholder, type = "text", name, value, setValue }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Icon size={18} />
    </div>
    <input
      type={type}
      name={name}
      required
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full pl-10 pr-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const PasswordField = ({ value, setValue }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Lock size={18} />
      </div>
      <input
        type={show ? "text" : "password"}
        name="password"
        required
        placeholder="Password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-10 pr-10 py-2 bg-white/10 text-white rounded-xl border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </div>
    </div>
  );
};

const SignupForm = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !username || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await API.post("users/register", {
        fullname,
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">
      {/* You can add animated background here later */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/10"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <InputField icon={User} placeholder="Full Name" name="fullname" value={fullname} setValue={setFullname} />
          <InputField icon={AtSign} placeholder="Username" name="username" value={username} setValue={setUserName} />
          <InputField icon={Mail} placeholder="Email" name="email" value={email} setValue={setEmail} />
          <PasswordField value={password} setValue={setPassword} />

          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow-md transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupForm;
