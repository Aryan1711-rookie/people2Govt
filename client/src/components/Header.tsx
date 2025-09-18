import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import crs1 from "../assets/crousel-1.jpg";
import crs2 from "../assets/crousel-2.jpg";
import crs3 from "../assets/crousel-3.jpg";
import { ArrowRight, MapPin, Camera, Send } from "lucide-react";

const images = [crs1, crs2, crs3];
const imageAlts = ["Mining Tourism", "Patratu Valley", "Baidyanath Temple"];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="pt-2 min-h-screen bg-white relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.7 }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Empowering Citizens,
              <br />
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Strengthening Jharkhand
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A streamlined, mobile-first solution to report, track, and resolve
              everyday civic issues, fostering better civic engagement and
              government accountability.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <a
                href="/dashboard_user"
                className="group bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Report an Issue</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/dashboard/issues"
                className="group bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Track My Status</span>
              </a>
            </motion.div>

            {/* Features */}
            <motion.div
              className="flex flex-wrap items-center space-x-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { icon: MapPin, text: "Auto-Location Tagging" },
                { icon: Camera, text: "Photo & Voice Uploads" },
                { icon: Send, text: "Real-time Updates" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center space-x-2 my-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <item.icon className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side carousel */}
          <motion.div
            className="relative h-[500px] hidden lg:block rounded-3xl overflow-hidden shadow-2xl w-[100%]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={imageAlts[index]}
                className="absolute top-0 left-0 w-full h-full object-cover object-top"
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 1.05,
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            ))}

            {/* Floating cards with subtle motion */}
            <motion.div
              className="absolute bottom-6 left-6 bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-green-100 flex items-center gap-3"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-800">
                Live reports across Jharkhand
              </span>
            </motion.div>

            <motion.div
              className="absolute top-6 right-6 bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-green-100"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-2xl font-extrabold text-green-700">10k+</div>
              <div className="text-xs text-gray-600">Total Reports</div>
            </motion.div>

            <motion.div
              className="absolute bottom-28 left-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-green-100"
              whileHover={{ scale: 1.05 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-2xl font-extrabold text-green-700">98%</div>
              <div className="text-xs text-gray-600">Issues Resolved</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;
