import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {TimeDisplay} from "../pages/BiddingItem";
const FeaturedBidding = ({
  imgsrc,
  title,
  type,
  startingBid,
  quantity,
  unit,
  location,
  startTime,
  endTime,
  id,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/bidding/item/${id}`);
  } 
  return (
    <>
      <Card>
        <div className="cursor-pointer" onClick={handleClick} >
          <CardContent className="p-2 mx-auto flex flex-col gap-2">
            <div className="flex-1">
              <img
                src={imgsrc}
                alt={title}
                className="w-full aspect-[2/1] rounded-lg"
              />
            </div>
            <div className="flex-1 flex-col gap-1 p-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      type === "yielditem"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {type === "yielditem" ? "Current Yield" : "Contract"}
                  </span>
                </div>
                <TimeDisplay
                  startTime={startTime}
                  endTime={endTime}
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="text-lg font-medium">{quantity}{unit.toUpperCase()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Starting Bid</p>
                  <p className="text-lg font-medium">{startingBid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg font-medium">{location}</p>
                </div>
              </div>
            </div>
          </CardContent>
          </div>
      </Card>
    </>
  );
};

export default FeaturedBidding;
