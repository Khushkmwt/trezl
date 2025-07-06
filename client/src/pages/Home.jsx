import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UploadCloud, Share2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  })
};

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gray-50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Your Vault. Encrypted. Shareable. Trezl.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Trezl empowers you to securely store, access, and share your digital documents — with complete control and confidence.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Get Started
            </Link>
            <Link to="/features" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50">
              Explore Features
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Trezl?
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-10 text-center">
            {[{
              icon: <ShieldCheck className="mx-auto text-blue-600 w-10 h-10 mb-3" />,
              title: 'End-to-End Encryption',
              desc: 'Your files are encrypted before they leave your device.'
            },
            {
              icon: <UploadCloud className="mx-auto text-blue-600 w-10 h-10 mb-3" />,
              title: 'Easy Uploads',
              desc: 'Drag, drop, or browse to securely upload any file type.'
            },
            {
              icon: <Share2 className="mx-auto text-blue-600 w-10 h-10 mb-3" />,
              title: 'Secure Sharing',
              desc: 'Generate smart links with permissions and expiry settings.'
            },
            {
              icon: <Clock className="mx-auto text-blue-600 w-10 h-10 mb-3" />,
              title: 'Access Logs',
              desc: 'Know who viewed your files, when, and from where.'
            }].map((feat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {feat.icon}
                <h3 className="text-xl font-semibold text-gray-700">{feat.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="px-6 py-20 text-center bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Take control of your documents today</h2>
        <p className="text-gray-600 mb-8">Join Trezl and secure your digital world — one file at a time.</p>
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Create an Account
        </Link>
      </motion.section>
    </div>
  );
}
