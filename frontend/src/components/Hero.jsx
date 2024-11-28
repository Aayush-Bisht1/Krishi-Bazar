import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import img from './assets/Hero-Tractor.jpg';
import mobileimg from './assets/mobile-tractor-hero.jpeg';
import logo from './assets/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import { ImCancelCircle } from "react-icons/im";
import { RiAuctionFill } from "react-icons/ri";

function Hero() {
  const [show, setShow] = useState(false);
  const {isAuthenticated} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="hidden md:block h-screen w-full flex items-center justify-center bg-gray-100 ">
          <img
            src={img}
            alt="img"
            className="h-full w-full object-cover "
          />
        </div>
        <div className="block md:hidden h-full w-full">
          <img
            src={mobileimg}
            alt="mobile-img"
            className="h-full w-full object-cover "
          />
        </div>
      </div>

      {/* Navbar */}
      <div className="relative z-10 flex h-16 items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <img src={logo} alt="logo" width={40} height={40} className="rounded-full" />
          <h1 className="text-3xl font-extrabold text-gray-800 font-verdana pl-2.5 ">KrishiBazar</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to={"/"}  className="text-black text-l font-bold transition hover:text-slate-700">HOME</Link>
          <Link to={"/working"} className="text-black text-l font-bold transition hover:text-slate-700">WORKING</Link>
          <Link to={"/bidding"} className="text-black text-l font-bold transition hover:text-slate-700 flex items-center gap-1"> <RiAuctionFill className='text-xl'/> BIDDING</Link>
          <Link to={"/contract"} className="text-black text-l font-bold transition hover:text-slate-700">CONTRACT</Link>
          <Link to={"/news"} className="text-black text-l font-bold transition hover:text-slate-700 ml-10">NEWS</Link>
          <Link to={"/charts"} className="text-black text-l font-bold transition hover:text-slate-700">CHARTS</Link>
          <Link href="#" className="text-black text-l font-bold transition hover:text-slate-700">CHATROOM</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/sign-in" className="bg-teal-600 text-white font-medium px-5 py-2.5 rounded-md transition hover:bg-teal-700">
            Login
          </Link>
          <Link href="/signup" className="hidden sm:block bg-gray-100 text-teal-600 font-medium px-5 py-2.5 rounded-md transition hover:text-teal-600/25">
            Register
          </Link>
          <button className="md:hidden block p-2.5 text-gray-600 bg-gray-100 rounded"
            onClick={()=>setShow(!show)}>
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {
            show ? 
            <div className='w-[100%] bg-[#f6f4f0] h-screen fixed top-0 left-0 transition-all duration-100 flex flex-col justify-between lg:left-0'>
              <button onClick={()=>setShow(!show)} className='absolute top-5 right-5 text-3xl'>
                <ImCancelCircle/>
              </button>
            </div> 
            : <></>
          }
      </div>

      {/* Contract and Farming Text */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10 ${show ? 'hidden' : ''}`}>
        <h1
          className="uppercase font-black text-5xl md:text-9xl text-white drop-shadow-[4px_7px_var(--tw-shadow-color)] shadow-gray-500"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          contract
        </h1>
        <h1
          className="uppercase font-black text-4xl md:text-8xl text-white drop-shadow-[5px_6px_var(--tw-shadow-color)] shadow-gray-600"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          farming
        </h1>
      </div>
    </div>  
  );
}

export default Hero;