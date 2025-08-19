import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const projects = [
    {
      title: "Muse – Gesture Controlled Mouse",
      desc: "An ESP32 project using motion sensors to create an accessibility-focused input device.",
      details: "Muse uses an MPU6050 accelerometer + ESP32 to translate head/hand movements into mouse input. It was adopted by a friend with fine motor control challenges, making tech more accessible.",
    },
    {
      title: "SymptoAI – AI Doctor",
      desc: "Winner of Hack the Ridge 2024. AI-powered healthcare assistant for low-connectivity areas.",
      details: "SymptoAI combines deep learning, NLP, and lightweight models to provide basic medical triage in regions with limited internet access. Built with Python, Flask, PyTorch, and Raspberry Pi.",
    },
    {
      title: "RGB LED Panel",
      desc: "Custom PCB + Arduino project that syncs patterns with audio signals.",
      details: "Designed and soldered a custom PCB with individually addressable LEDs. The panel responds dynamically to sound using FFT on Arduino, creating synchronized light shows.",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Sending...");

    emailjs
      .send(
        "YOUR_SERVICE_ID", // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // replace with your EmailJS template ID
        formData,
        "YOUR_PUBLIC_KEY" // replace with your EmailJS public key
      )
      .then(
        () => {
          setFormStatus("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error(error);
          setFormStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"} min-h-screen transition-colors`}>
      {/* Navbar */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-50">
        <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xl font-bold">
            My Portfolio
          </motion.h1>
          <div className="space-x-6 flex items-center">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Projects</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a>
            <Button size="sm" variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Hi, I’m <span className="text-blue-600 dark:text-blue-400">A</span>
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A passionate builder, programmer, and innovator. I create projects that merge technology, design, and impact.
        </p>
      </section>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6">About Me</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          I’m a student, innovator, and builder passionate about robotics, software, and hardware. Over the years, I’ve worked on projects that blend creativity with impact, from accessibility devices to AI-driven healthcare. My journey includes leadership in robotics, hackathons, and mentoring younger students to ignite their curiosity for STEM.
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-10 text-center">Projects</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setSelectedProject(p)}>
              <Card className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{p.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{p.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-lg p-8 relative"
            >
              <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500" onClick={() => setSelectedProject(null)}>✕</button>
              <h4 className="text-2xl font-bold mb-4">{selectedProject.title}</h4>
              <p className="text-gray-700 dark:text-gray-300">{selectedProject.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact */}
      <section id="contact" className="bg-white dark:bg-gray-900 py-16 text-center shadow-inner">
        <h3 className="text-3xl font-bold mb-6">Let’s Connect</h3>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-32" />
          <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-3 w-full">
            Send Message
          </Button>
          {formStatus && <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{formStatus}</p>}
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} A – All rights reserved.
      </footer>
    </div>
  );
}
