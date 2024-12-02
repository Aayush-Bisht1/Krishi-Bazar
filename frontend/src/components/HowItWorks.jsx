import React from 'react';
import { UserPlus, Gavel, Mail, Receipt, AlertTriangle, FileCheck, RefreshCw } from 'lucide-react';

const HowItWorks = ({setShowAuthModal}) => {
  const mainSteps = [
    {
      icon: <UserPlus size={40} className="text-blue-600" />,
      title: "Register & Choose Role",
      description: "Sign up and select your role - Farmer to list current yield / farming contract or Buyer to participate in biddings.",
      details: [
        "Quick and secure registration process",
        "Verify your email to activate account",
        "Choose between Buyer or Farmer role",
        "Complete profile with required details for your role"
      ]
    },
    {
      icon: <Gavel size={40} className="text-blue-600" />,
      title: "Bidding Process",
      description: "Farmer list current yield / farming contract while Buyers participate in active biddings.",
      details: [
        "Farmers can post items with details as quantity, price, pictures and description",
        "Buyers can place bids on active biddings",
        "Real-time updates on current highest bid",
        "Auto-notification when outbid"
      ]
    },
    {
      icon: <Mail size={40} className="text-blue-600" />,
      title: "Winning & Payment",
      description: "Winners receive payment instructions via email to complete the purchase.",
      details: [
        "Automatic winner notification",
        "Payment method options provided",
        "Includes bank transfer, PayPal, RazorPay",
        "Secure payment processing"
      ]
    },
    {
      icon: <Receipt size={40} className="text-blue-600" />,
      title: "Commission & Compliance",
      description: "Farmer must pay 5% platform commission after successful sales.",
      details: [
        "5% commission on successful sales",
        "Commission payment verification required",
        "Upload payment proof through dashboard",
        "Maintain compliance to continue posting"
      ]
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">How Our Bidding Platform Works</h2>
          <p className="text-lg text-gray-600">Your trusted marketplace where farmers connect with reliable buyers, eliminating middlemen and ensuring that they receive fair prices for their produce.</p>
        </div>

        {/* Main Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mainSteps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {step.description}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-12">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-yellow-600 mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-900">Important Notes</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2 mt-2"></span>
              <p className="text-gray-700">Login required for posting auctions, bidding, and accessing dashboard features</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2 mt-2"></span>
              <p className="text-gray-700">Farmers must pay 5% commission to maintain platform privileges</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2 mt-2"></span>
              <p className="text-gray-700">Payment proof must be submitted within 48 hours of receiving payment</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2 mt-2"></span>
              <p className="text-gray-700">Items can be reposted if unsold or after successful completion of previous auction</p>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300" onClick={() => setShowAuthModal(true)} >
            Get Started Now
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Join our community of successful farmers and buyers
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;