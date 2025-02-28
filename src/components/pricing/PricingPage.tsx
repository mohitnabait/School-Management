import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

const PricingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const pricingPlans = [
    {
      name: "Starter",
      price: "$299",
      period: "per month",
      description: "Perfect for small schools just getting started",
      features: [
        {
          name: "Up to 500 students",
          tooltip: "Manage up to 500 student profiles",
        },
        {
          name: "Basic attendance tracking",
          tooltip: "Daily attendance recording and basic reports",
        },
        {
          name: "Grade management",
          tooltip: "Record and track student grades",
        },
        {
          name: "Parent portal",
          tooltip: "Basic parent access to student information",
        },
        {
          name: "Email support",
          tooltip: "Support via email with 24-hour response time",
        },
        { name: "Data export", tooltip: "Export data in CSV format" },
        {
          name: "Mobile app access",
          tooltip: "Basic mobile app functionality",
        },
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$599",
      period: "per month",
      description: "Ideal for growing schools with advanced needs",
      features: [
        {
          name: "Up to 2,000 students",
          tooltip: "Manage up to 2,000 student profiles",
        },
        {
          name: "Advanced attendance system",
          tooltip:
            "Multiple attendance tracking methods with detailed analytics",
        },
        {
          name: "Comprehensive grade management",
          tooltip:
            "Advanced grading scales, weighted grades, and custom report cards",
        },
        {
          name: "Communication hub",
          tooltip: "Integrated messaging between staff, students, and parents",
        },
        {
          name: "Resource management",
          tooltip: "Track and allocate school resources and facilities",
        },
        {
          name: "Exam management",
          tooltip: "Create, schedule, and grade exams with analytics",
        },
        {
          name: "Priority support",
          tooltip: "Priority email and chat support with 12-hour response time",
        },
        {
          name: "API access",
          tooltip: "Access to our API for custom integrations",
        },
        {
          name: "Advanced reporting",
          tooltip: "Comprehensive data visualization and custom reports",
        },
        {
          name: "Staff training",
          tooltip: "2 hours of virtual training for staff",
        },
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large educational institutions",
      features: [
        {
          name: "Unlimited students",
          tooltip: "No limit on the number of student profiles",
        },
        {
          name: "All Professional features",
          tooltip: "Includes all features from the Professional plan",
        },
        {
          name: "Custom integrations",
          tooltip:
            "Dedicated development support for custom system integrations",
        },
        {
          name: "Advanced analytics",
          tooltip: "AI-powered insights and predictive analytics",
        },
        {
          name: "Dedicated account manager",
          tooltip: "Personal account manager for your institution",
        },
        {
          name: "24/7 premium support",
          tooltip: "Round-the-clock support via phone, email, and chat",
        },
        {
          name: "On-site training",
          tooltip: "Comprehensive on-site training for staff",
        },
        {
          name: "Custom development",
          tooltip: "Custom feature development to meet specific needs",
        },
        {
          name: "White labeling",
          tooltip: "Customize the platform with your school's branding",
        },
        {
          name: "Data migration assistance",
          tooltip: "Full support for migrating from existing systems",
        },
      ],
      cta: "Contact Us",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to additional features. When downgrading, changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees for our Starter and Professional plans. For Enterprise customers, setup fees may apply depending on the complexity of custom integrations and requirements.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer:
        "Yes, we offer a 15% discount when you choose annual billing instead of monthly billing for our Starter and Professional plans.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions.",
    },
    {
      question: "Is there a contract or minimum commitment?",
      answer:
        "Our monthly plans can be canceled anytime with no minimum commitment. Annual plans are paid upfront for the year but come with our 30-day money-back guarantee.",
    },
    {
      question:
        "Do you offer special pricing for non-profits or educational institutions?",
      answer:
        "Yes, we offer special pricing for registered non-profit organizations and public educational institutions. Please contact our sales team for more information.",
    },
  ];

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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your school's needs with no hidden fees
            </p>
          </motion.div>

          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card
                    className={`h-full relative overflow-hidden ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-2 border-purple-500/50"
                        : "bg-black/40 border border-white/10"
                    } backdrop-blur-sm hover:scale-[1.03] transition-transform duration-300 group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-rotate-gradient"></div>
                    {plan.highlighted && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 transform translate-x-8 translate-y-4 rotate-45">
                        POPULAR
                      </div>
                    )}
                    <div className="p-6 flex flex-col h-full relative z-10">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-white">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-gray-400 ml-2">
                            {plan.period}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-6">{plan.description}</p>

                      <div className="mb-8 flex-grow">
                        <h4 className="text-sm font-medium text-gray-300 mb-3">
                          What's included:
                        </h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-gray-400"
                            >
                              <CheckCircle className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                              <span>{feature.name}</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5 ml-1 p-0"
                                    >
                                      <HelpCircle className="h-3 w-3 text-gray-500" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      {feature.tooltip}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto">
                        <Button
                          type="button"
                          onClick={() => navigate("/auth")}
                          className={`w-full ${
                            plan.highlighted
                              ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                              : "bg-white/10 hover:bg-white/20"
                          } text-white py-6`}
                        >
                          {plan.cta}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent relative z-10">
                Frequently Asked Questions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {faqs.map((faq, index) => (
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">
              Need a custom solution?
            </h2>
            <p className="text-gray-300 mb-8">
              Contact our sales team for a personalized quote tailored to your
              specific requirements.
            </p>
            <Button
              onClick={() => navigate("/contact")}
              className="px-8 py-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium text-lg"
            >
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
