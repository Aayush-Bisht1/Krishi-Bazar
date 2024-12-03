import React, { useState } from "react";
import {
  Menu,
  X,
  Tractor,
  Hammer,
  Users,
  ShoppingBag,
  FileCheck,
  RefreshCw,
} from "lucide-react";
import { FaTractor } from "react-icons/fa";
import logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import HowItWorks from "@/components/HowItWorks";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const features = [
    {
      icon: <Tractor className="h-6 w-6 text-green-600" />,
      title: "Farmer Direct Contracts",
      description:
        "Connect directly with farmers and secure premium produce through transparent contracts",
    },
    {
      icon: <Hammer className="h-6 w-6 text-green-600" />,
      title: "Live Bidding Platform",
      description:
        "Participate in real-time auctions for fresh farm produce and agricultural products",
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Verified Community",
      description:
        "Join our trusted network of verified farmers and reliable buyers",
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-green-600" />,
      title: "Secure Transactions",
      description: "Safe and transparent payment system with escrow protection",
    },
    {
      icon: <FileCheck className="h-6 w-6 text-green-600" />,
      title: "Proof of Payment",
      description: "Secure verification system for payment confirmation",
      },
    {
      icon: <RefreshCw className="h-6 w-6 text-green-600" />,
      title: "Reposting Items",
      description: "Easy process to relist unsold or new items",
    },
  ];

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Join KrishiBazar</h2>
          <button onClick={() => setShowAuthModal(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div
            className="border rounded-lg p-4 hover:border-green-500 cursor-pointer transition-colors"
            onClick={() => navigate("/signup/farmer")}
          >
            <h3 className="font-semibold text-lg mb-2">I'm a Farmer</h3>
            <p className="text-gray-600 text-sm">
              List your produce and connect with buyers
            </p>
          </div>

          <div
            className="border rounded-lg p-4 hover:border-green-500 cursor-pointer transition-colors"
            onClick={() => navigate("/signup/buyer")}
          >
            <h3 className="font-semibold text-lg mb-2">I'm a Buyer</h3>
            <p className="text-gray-600 text-sm">
              Find and bid on quality agricultural products
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <button
              className="text-green-600 font-semibold ml-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen" id="home">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-20 top-0 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center " onClick={() => scrollToSection("home")}>
              <img src={logo} alt="KrishiBazar Logo" className="h-10 w-10 cursor-pointer" />
              <span className="ml-2 text-xl font-bold text-gray-900 cursor-pointer">
                KrishiBazar
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a onClick={() => scrollToSection("features")} className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Features
              </a>
              <a
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                How it Works
              </a>
              <a
                onClick={() => navigate("/marketplace")}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Marketplace
              </a>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors "
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-gray-100 p-2 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                onClick={() => scrollToSection("features")}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Features
              </a>
              <a
                onClick={() => scrollToSection("how-it-works")}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                How it Works
              </a>
              <a
                href="#marketplace"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Marketplace
              </a>
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full text-left px-3 py-2 text-green-600 hover:text-green-700"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 h-screen">
        <div className="absolute inset-0 z-0 ">
          <img
            src="/api/placeholder/1920/1080"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 " />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
            <div className="text-center md:text-left">
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Revolutionizing Farm-to-Market Connection
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-8">
                Connect directly with farmers, participate in live bidding,
                eliminating middlemen and secure premium agricultural products
                or contract
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Start Selling
                </button>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Buying
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <FaTractor className="w-64 h-64 text-brown-600 opacity-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose KrishiBazar?
            </h2>
            <p className="mt-2 text-xl text-gray-600">
              Everything you need to succeed in agricultural trade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" >
        <HowItWorks setShowAuthModal={setShowAuthModal} />
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal />}
    </div>
  );
};

export default LandingPage;
