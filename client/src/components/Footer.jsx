import React from 'react';
import { Link } from 'react-router-dom';
import { Github, X, Mail, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            Trezl
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Trezl helps you store, encrypt, and share your files securely from anywhere in the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/features" className="hover:text-white">Features</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="/support" className="hover:text-white">Help & Support</Link></li>
            <li><Link to="/docs" className="hover:text-white">API Docs</Link></li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Connect</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://github.com/yourorg" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Github />
            </a>
            <a href="https://twitter.com/trezl" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <X />
            </a>
            <a href="mailto:support@trezl.com" className="hover:text-white">
              <Mail />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Email us at <a href="mailto:support@trezl.com" className="underline">support@trezl.com</a>
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Trezl Inc. All rights reserved.</p>
        <p className="flex justify-center items-center gap-1 mt-1 text-xs">
          <Shield size={14} /> Your privacy, our priority.
        </p>
      </div>
    </footer>
  );
}
