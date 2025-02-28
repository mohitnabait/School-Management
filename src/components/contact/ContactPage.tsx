import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, MessageSquare, User } from "lucide-react";
import { useCustomToast } from "../common/Toast";
import Navbar from "../layout/Navbar";

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess } = useCustomToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      showSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isDarkMode={darkMode} onDarkModeChange={setDarkMode} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-16 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-8 h-full">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 text-white pl-10"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 text-white pl-10"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 text-white pl-10"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white min-h-[150px]"
                      placeholder="Your message here..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <Card className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-8">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-white/5 text-purple-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Email Us
                      </h3>
                      <p className="text-gray-400">info@schoolmanagement.com</p>
                      <p className="text-gray-400">
                        support@schoolmanagement.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-white/5 text-cyan-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Call Us
                      </h3>
                      <p className="text-gray-400">+1 (123) 456-7890</p>
                      <p className="text-gray-400">+1 (987) 654-3210</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-white/5 text-emerald-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Visit Us
                      </h3>
                      <p className="text-gray-400">123 Education Avenue</p>
                      <p className="text-gray-400">
                        Suite 500, Tech City, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-8">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Office Hours
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white">Monday - Friday:</span>
                    <span className="text-gray-400">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Saturday:</span>
                    <span className="text-gray-400">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Sunday:</span>
                    <span className="text-gray-400">Closed</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 max-w-6xl mx-auto"
          >
            <Card className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-8">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "How do I get started with your platform?",
                    answer:
                      "Getting started is easy! Simply sign up for an account, and our team will guide you through the setup process. We offer comprehensive onboarding support to ensure a smooth transition.",
                  },
                  {
                    question: "Is there a free trial available?",
                    answer:
                      "Yes, we offer a 30-day free trial for all new users. This gives you full access to all features so you can experience the benefits of our platform before committing.",
                  },
                  {
                    question: "Do you offer custom integrations?",
                    answer:
                      "Absolutely! Our Enterprise plan includes custom integrations with your existing systems. Our development team will work closely with you to ensure seamless data flow.",
                  },
                  {
                    question: "How secure is your platform?",
                    answer:
                      "Security is our top priority. We use industry-standard encryption, regular security audits, and comply with all relevant data protection regulations to keep your information safe.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
