
# ⚡ React + Vite + Tailwind + Zustand Template

Lightweight, modern frontend starter built with:

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🧠 Zustand (global state)
- 📡 Axios (ready for API)
- 🧭 React Router (with Login + Home)
- 🧱 Navbar + Footer components

---

## 🏃‍♂️ Quick Start

```bash
git clone https://github.com/Khushkmwt/react_template
cd client
npm install
npm run dev
```

---

## 📁 File Structure

```
client/
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── Server/ Axios.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 📦 Package.json

```json
{
  "name": "vite-react-tailwind-zustand-template",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.3.2",
    "vite": "^5.0.0"
  }
}
```

---

## ✨ Vite Config (vite.config.js)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Change this to your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

```


---

---

## 🧠 Zustand Store – `src/store/userStore.js`

```js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
```

---

## 🌐 Axios – `src/api/axios.js`

```js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default API;
```

---

## 🧱 App Component – `src/App.jsx`

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
```

---

## 🚀 Entry – `src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🎨 Global CSS – `src/index.css`

```css
@import "tailwindcss";

body {
  @apply bg-gray-50 text-gray-900;
}
```

---

## 🌟 Navbar – `src/components/Navbar.jsx`

```jsx
import { Link } from 'react-router-dom';
import useUserStore from '../store/userStore';

const Navbar = () => {
  const { user, logout } = useUserStore();
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">MyTemplate</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={logout} className="text-sm text-red-500 border px-2 py-1 rounded hover:bg-red-100">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
```

---

## 📎 Footer – `src/components/Footer.jsx`

```jsx
const Footer = () => (
  <footer className="bg-gray-100 p-4 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} KHUSH — Starter Template
  </footer>
);

export default Footer;
```

---

## 🏠 Home Page – `src/pages/Home.jsx`

```jsx
const Home = () => (
  <div className="max-w-3xl mx-auto text-center mt-12">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">React Vite Tailwind Template</h1>
    <p className="text-lg text-gray-600 mb-6">
      This is a ready-to-use template project with preconfigured setup for rapid frontend development.
    </p>
    <pre className="bg-gray-100 p-4 rounded text-left text-sm overflow-auto">
      {`
✅ React + Vite
✅ Tailwind CSS
✅ Zustand for state
✅ Axios (API Ready)
✅ Login & Home pages
✅ Navbar + Footer
      `}
    </pre>
  </div>
);

export default Home;
```

---

## 🔐 Login Page – `src/pages/Login.jsx`

```jsx
import { useState } from 'react';
import useUserStore from '../store/userStore';

const Login = () => {
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Demo User', email });
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
```

---

**Made by KHUSH** | Web Dev + ML + Historic Vibes 🇮🇳  
License: MIT — Use it, clone it, remix it.

