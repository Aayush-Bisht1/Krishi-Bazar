"use client"
import React from "react";
import logo from "./assets/logo.png";
import Vector from "./assets/download.png";
import Vector1 from "./assets/download (1).png";
import Vector2 from "./assets/download (2).png";
import footerBg from "./assets/footerBg.c348c1bedb0ad9d9a5b0.png";

const Footer = () => {
  return (
    <div className="bg-[#219653] w-100vw h-60vh py-20">
      <div className="flex justify-center items-center">
        <div className="flex-1 border-r-2 border-black-600">
          <div
            className="flex justify-center items-center mx-8 cursor-pointer"
          >
            <img 
            src={logo}
            className="w-[60px] h-[60px]"
            alt=""/>
            <div className="ml-4">
              <h3 className="text-2xl text-white font-bold mt-4">
                Krishi <br /> Bazar
              </h3>
              <p className="text-md font-normal text-white mt-2">
                Kisaan upkaran ka ek Matra Sadhan.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <div className="flex">
            <ul className="list-none mr-24">
              <li
                className="text-lg text-white font-bold cursor-pointer"
              >
                Home
              </li>
              {/* <li className='text-lg text-white font-medium cursor-pointer'>Menu</li> */}
              <li className="text-lg text-white font-medium cursor-pointer">
                Market
              </li>
            </ul>
            <ul>
              <li
                className="text-lg text-white font-bold cursor-pointer"
              >
                Support Center
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
                
              >
                Help Center
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"

              >
                Partner Dispute
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
              >
                FAQs
              </li>
            </ul>
          </div>
          <p className="text-md text-medium text-white mt-4">
            Please provide us Feedback{" "}
            <button
              className="text-xl underline"
            >
              HERE
            </button>
          </p>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <h1 className="text-xl ml-6 text-white font-bold w-2/3">
            Give us a follow on social media
          </h1>
          <div className="flex my-5 gap-[10px] justify-left">
            <img 
            src={Vector}
            alt=""
            className="w-[40px] h-[40px]"
            />
            <img
            src={Vector1}
            alt=""
            className="w-[40px] h-[40px]"
            />
            <img
            src={Vector2}
            alt=""
            className="w-[40px] h-[40px]"
            />
          </div>
          <p className="text-lg ml-6 text-white">
            Made by : <strong>Team Gryffindor</strong>
          </p>
        </div>
        <div className="flex-1 flex mr-6">
            <img
            src={footerBg}
            alt=""
            className="w-[80px] h-[80px]"
            />
          <h1 className="text-xl text-white font-bold mt-6">
            Ministry of Agriculture
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;