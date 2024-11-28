import React from "react";
import pic from "./assets/videoPic.7aa1c4cbb580a70f4085.png"
const Workflow = () => {
  return (
    <div className=" mb-10 p-12 bg-[#0D9488] ">
      <h1 className="text-4xl text-black font-bold uppercase mb-4 text-center">
        How KRISHI BAZAR works?
      </h1>
      <p className="text-md font-medium uppercase mb-4 text-black text-center">
        Take a Look at out Platform Demo
      </p>
      <div className="flex justify-around mediaQuery items-center text-black">
        <div className="grow">
          <ul className="list-decimal ml-[90px] list-inside font-bold">
            <li className="text-2xl mr-4 my-4">Sign-up to the platform.</li>
            <li className="text-2xl mr-4 my-3">
              Farmer would list their Crop.
            </li>
            <li className="text-2xl mr-4 my-4">Specifying condition related to quality quantity expected yield and photograph.</li>
            <li className="text-2xl mr-4 my-3">
              Explore and filter lists of crops.
            </li>
            <li className="text-2xl mr-4 my-4">
              Buyers can bid in realtime.
            </li>
            <li className="text-2xl mr-4 my-3">
              Chat with the owner and make a booking.
            </li>
            <li className="text-2xl mr-4 my-4">Stay updated by SMS.</li>
          </ul>
        </div>
        <div className="h-1/2 w-1/2">
          {/* <img src={Rectangle73} className='youtubeImg' alt="" /> */}
          <img 
          src={pic}
          alt="img"/>
        </div>
      </div>
    </div>
  );
};

export default Workflow;